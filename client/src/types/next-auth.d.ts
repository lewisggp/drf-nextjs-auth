// Next Auth Imports
import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */

	interface User extends DefaultUser {
		accessToken: string;
		refreshToken: string;
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
