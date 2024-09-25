'use client';

// Next Auth Imports
import { signIn } from 'next-auth/react';

export default function SignInButton() {
	return (
		<button
			onClick={() => signIn()}
			className='mt-4 rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition'
		>
			Sign in
		</button>
	);
}
