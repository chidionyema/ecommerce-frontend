// File: pages/api/auth/[...nextauth].ts
export const runtime = 'experimental-edge';

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import MicrosoftProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

// Get the API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';

// Helper function to refresh the token
async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${API_URL}/api/Authentication/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        AccessToken: token.accessToken,
        RefreshToken: token.refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expires: data.expires,
      // Update the expiry time for the token
      accessTokenExpires: new Date(data.expires).getTime(),
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    // Return the token with an error flag
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username and password are required');
        }

        try {
          const response = await fetch(`${API_URL}/api/Authentication/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Username: credentials.username,
              Password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Invalid username or password');
          }

          // Return the user data and token
          return {
            id: data.user.id,
            name: data.user.userName,
            email: data.user.email,
            accessToken: data.token,
            refreshToken: data.refreshToken,
            expires: data.expires,
            accessTokenExpires: new Date(data.expires).getTime(),
            isSubscribed: data.user.isSubscribed || false,
          };
        } catch (error) {
          console.error('Login error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID || '',
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || '',
      tenantId: process.env.MICROSOFT_TENANT_ID,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login', // Error code passed in query string as ?error=
    newUser: '/register', // New users will be directed here on first sign in
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        if (account.provider === 'credentials') {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expires: user.expires,
            accessTokenExpires: user.accessTokenExpires,
            isSubscribed: user.isSubscribed || false,
          };
        } else {
          // For social logins, we need to get the JWT from our backend
          try {
            // Exchange the OAuth access token for a JWT from our backend
            const response = await fetch(`${API_URL}/api/external-authentication/callback`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                provider: account.provider,
                accessToken: account.access_token,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || 'Failed to authenticate with social provider');
            }

            return {
              ...token,
              accessToken: data.token,
              refreshToken: data.refreshToken,
              expires: data.expires,
              accessTokenExpires: new Date(data.expires).getTime(),
              isSubscribed: data.user?.isSubscribed || false,
            };
          } catch (error) {
            console.error('Social auth token exchange error:', error);
            return token;
          }
        }
      }

      // On subsequent uses, check if token is expired or about to expire
      if (token.accessTokenExpires) {
        // If token is still valid for more than 1 minute
        if (Date.now() < (token.accessTokenExpires as number) - 60 * 1000) {
          return token;
        }
        
        // Token is expired or will expire soon, try to refresh it
        return refreshAccessToken(token);
      }

      // Fall back to checking using the expires string if accessTokenExpires is not available
      if (token.expires && new Date(token.expires as string) > new Date(Date.now() + 60 * 1000)) {
        return token;
      }

      // Token has expired or will expire soon, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      // If there's an error with the token, clear the session
      if (token.error) {
        return { ...session, error: token.error };
      }

      // Add the token to the session
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expires = token.expires as string;
      session.isSubscribed = token.isSubscribed as boolean;
      
      // Add user ID to the session
      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          isSubscribed: token.isSubscribed as boolean,
        };
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  // Enhanced event handlers
  events: {
    async signOut({ token }) {
      // Call backend logout endpoint when user signs out
      try {
        await fetch(`${API_URL}/api/Authentication/logout`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
          },
        });
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);