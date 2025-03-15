import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import MicrosoftProvider from 'next-auth/providers/azure-ad';
import { JWT } from 'next-auth/jwt';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ritualworks.com';

async function refreshAccessToken(token: JWT) {
  console.log('Refreshing access token:', token);
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

    const newToken = {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expires: data.expires,
      // Update the expiry time for the token
      accessTokenExpires: new Date(data.expires).getTime(),
    };
    console.log('Token refreshed successfully:', newToken);
    return newToken;
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
        console.log('CredentialsProvider authorize called with:', credentials);
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

          const userData = {
            id: data.user.id,
            name: data.user.userName,
            email: data.user.email,
            accessToken: data.token,
            refreshToken: data.refreshToken,
            expires: data.expires,
            accessTokenExpires: new Date(data.expires).getTime(),
            isSubscribed: data.user.isSubscribed || false,
          };
          console.log('CredentialsProvider authorize successful:', userData);
          return userData;
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
      console.log('JWT callback triggered:', { token, user, account });
      // Initial sign in
      if (account && user) {
        if (account.provider === 'credentials') {
          const newToken = {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            expires: user.expires,
            accessTokenExpires: user.accessTokenExpires,
            isSubscribed: user.isSubscribed || false,
          };
          console.log('JWT - Initial token (credentials):', newToken);
          return newToken;
        } else {
          // For social logins, we need to get the JWT from our backend
          try {
            console.log('JWT - Social login token exchange starting:', account);
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

            const newToken = {
              ...token,
              accessToken: data.token,
              refreshToken: data.refreshToken,
              expires: data.expires,
              accessTokenExpires: new Date(data.expires).getTime(),
              isSubscribed: data.user?.isSubscribed || false,
            };
            console.log('JWT - Social token exchange successful:', newToken);
            return newToken;
          } catch (error) {
            console.error('JWT - Social auth token exchange error:', error);
            return token;
          }
        }
      }

      // On subsequent uses, check if token is expired or about to expire
      if (token.accessTokenExpires) {
        if (Date.now() < (token.accessTokenExpires as number) - 60 * 1000) {
          console.log('JWT token is still valid:', token);
          return token;
        }
        console.log('JWT token expired or expiring soon, refreshing token:', token);
        const refreshedToken = await refreshAccessToken(token);
        console.log('JWT token after refresh:', refreshedToken);
        return refreshedToken;
      }

      if (token.expires && new Date(token.expires as string) > new Date(Date.now() + 60 * 1000)) {
        console.log('JWT token valid via expires string:', token);
        return token;
      }

      console.log('JWT fallback: refreshing token:', token);
      const refreshedToken = await refreshAccessToken(token);
      console.log('JWT fallback refreshed token:', refreshedToken);
      return refreshedToken;
    },
    async session({ session, token }) {
      console.log('Session callback triggered:', { session, token });
      if (token.error) {
        console.log('Session callback detected token error:', token.error);
        return { ...session, error: token.error };
      }

      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expires = token.expires as string;
      session.isSubscribed = token.isSubscribed as boolean;

      if (token.sub) {
        session.user = {
          ...session.user,
          id: token.sub,
          isSubscribed: token.isSubscribed as boolean,
        };
      }
      console.log('Session callback updated session:', session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback triggered:', { url, baseUrl });
      if (url.startsWith('/')) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log('Redirecting to relative URL:', redirectUrl);
        return redirectUrl;
      } else if (new URL(url).origin === baseUrl) {
        console.log('Redirecting to same origin URL:', url);
        return url;
      }
      console.log('Redirecting to baseUrl:', baseUrl);
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  events: {
    async signOut({ token }) {
      console.log('Sign out event triggered with token:', token);
      try {
        await fetch(`${API_URL}/api/Authentication/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
          },
        });
        console.log('Successfully signed out');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
