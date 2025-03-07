// Edge-compatible Auth API implementation
export const config = {
  runtime: 'experimental-edge'
};

import { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';

// Edge-compatible Base64 encoding/decoding
function encodeBase64(data: string) {
  return btoa(encodeURIComponent(data));
}

function decodeBase64(base64: string) {
  return decodeURIComponent(atob(base64));
}

export default async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const action = url.pathname.split('/').pop();

  // Parse request body if it exists
  let body = {};
  try {
    const text = await req.text();
    if (text) {
      body = JSON.parse(text);
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
  }

  switch (action) {
    case 'signin':
      return await handleSignIn(req, body);
    case 'callback':
      return await handleCallback(req, body);
    case 'session':
      return await handleSession(req);
    case 'signout':
      return await handleSignOut(req);
    default:
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}

async function handleSignIn(req: NextRequest, body: any) {
  try {
    // Extract credentials from request body
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call the backend API for authentication
    const response = await fetch(`${API_URL}/api/Authentication/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Username: username,
        Password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Authentication failed' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create a simple session object
    const session = {
      user: {
        id: data.user.id,
        name: data.user.userName,
        email: data.user.email,
        isSubscribed: data.user.isSubscribed || false,
      },
      accessToken: data.token,
      refreshToken: data.refreshToken,
      expires: data.expires,
    };

    // Create a base64 token using edge-compatible methods
    const token = encodeBase64(JSON.stringify(session));

    // Set the session cookie
    const cookieHeader = `session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;

    // Return the user data
    return new Response(JSON.stringify({
      user: session.user,
      redirectUrl: '/dashboard'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Sign-in error:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleCallback(req: NextRequest, body: any) {
  try {
    const { provider, accessToken } = body;

    if (!provider || !accessToken) {
      return new Response(JSON.stringify({ error: 'Provider and access token are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call the backend API to exchange the OAuth token
    const response = await fetch(`${API_URL}/api/external-authentication/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider,
        accessToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.message || 'Authentication failed' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create a simple session
    const session = {
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        isSubscribed: data.user.isSubscribed || false,
      },
      accessToken: data.token,
      refreshToken: data.refreshToken,
      expires: data.expires,
    };

    // Create a base64 token using edge-compatible methods
    const token = encodeBase64(JSON.stringify(session));

    // Set the session cookie
    const cookieHeader = `session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;

    // Return the user data
    return new Response(JSON.stringify({
      user: session.user,
      redirectUrl: '/dashboard'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Callback error:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleSession(req: NextRequest) {
  try {
    // Get the session token from cookies
    const cookies = req.headers.get('cookie') || '';
    const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('session-token='));
    
    if (!tokenCookie) {
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = tokenCookie.split('=')[1];

    // Decode the token using edge-compatible methods
    try {
      const sessionData = JSON.parse(decodeBase64(token));
      
      // Check if token needs refresh
      const expires = new Date(sessionData.expires);
      const now = new Date();
      
      // If token expires in less than 5 minutes, refresh it
      if (expires.getTime() - now.getTime() < 300000) {
        // Call refresh token endpoint
        if (sessionData.refreshToken) {
          try {
            const response = await fetch(`${API_URL}/api/Authentication/refresh-token`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                AccessToken: sessionData.accessToken,
                RefreshToken: sessionData.refreshToken,
              }),
            });

            const data = await response.json();

            if (response.ok) {
              // Create a new session with the refreshed tokens
              const newSession = {
                ...sessionData,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                expires: data.expires,
              };

              // Create new token
              const newToken = encodeBase64(JSON.stringify(newSession));

              // Set the new session cookie
              const cookieHeader = `session-token=${newToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;

              return new Response(JSON.stringify({
                user: sessionData.user
              }), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json',
                  'Set-Cookie': cookieHeader
                }
              });
            }
          } catch (error) {
            console.error('Token refresh error:', error);
          }
        }
      }

      // Return the session data
      return new Response(JSON.stringify({
        user: sessionData.user
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      // Clear the invalid session cookie
      const cookieHeader = `session-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
      
      return new Response(JSON.stringify({ user: null }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookieHeader
        }
      });
    }
  } catch (error) {
    console.error('Session error:', error);
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleSignOut(req: NextRequest) {
  try {
    // Get the session token from cookies
    const cookies = req.headers.get('cookie') || '';
    const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('session-token='));
    
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      
      try {
        // Decode the token to get the access token
        const sessionData = JSON.parse(decodeBase64(token));
        
        // Call the backend logout endpoint
        if (sessionData.accessToken) {
          await fetch(`${API_URL}/api/Authentication/logout`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionData.accessToken}`
            },
          });
        }
      } catch (error) {
        console.error('Token decoding error during logout:', error);
      }
    }

    // Clear the session cookie
    const cookieHeader = `session-token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieHeader
      }
    });
  } catch (error) {
    console.error('Sign-out error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}