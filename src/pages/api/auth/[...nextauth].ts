// Edge-compatible Auth API implementation
export const runtime = 'edge';

import { NextRequest } from 'next/server';
import { getCookie, setCookie } from 'cookies-next';
import { jwtVerify, SignJWT } from 'jose';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.local.ritualworks.com';
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'your-secret-key');

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

    // Create a JWT token for the session
    const token = await new SignJWT({
      id: data.user.id,
      name: data.user.userName,
      email: data.user.email,
      isSubscribed: data.user.isSubscribed || false,
      accessToken: data.token,
      refreshToken: data.refreshToken,
      expires: data.expires,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    // Set the session cookie
    const cookieHeader = `session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;

    // Return the user data
    return new Response(JSON.stringify({
      user: {
        id: data.user.id,
        name: data.user.userName,
        email: data.user.