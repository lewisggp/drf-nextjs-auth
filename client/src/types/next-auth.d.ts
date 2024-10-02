// Next Auth Imports
import type { DefaultSession, DefaultUser } from 'next-auth';

// Type Imports
import type { LoginError, RegistrationError } from './django-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface User extends DefaultUser {
		accessToken?: string;
		refreshToken?: string;
		error?: LoginError | RegistrationError;
	}

	interface Session {
		user: {
			name?: string | undefined;
			email?: string | undefined;
			image?: string | undefined;
		} & DefaultSession['user'];
		accessToken?: string;
		refreshToken?: string;
	}
}
