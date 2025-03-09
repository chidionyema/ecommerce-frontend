// File: types/next-auth.d.ts

import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    expires?: string;
    isSubscribed?: boolean;
    error?: string;
    user: {
      /** The user's id */
      id?: string;
      isSubscribed: boolean;
    } & DefaultSession['user'];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    expires?: string;
    accessTokenExpires?: number;
    isSubscribed?: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    accessToken?: string;
    refreshToken?: string;
    expires?: string;
    accessTokenExpires?: number;
    isSubscribed?: boolean;
    error?: string;
  }
}