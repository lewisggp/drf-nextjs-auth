'use client';

// Next Auth Imports
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<button
			onClick={() => signOut()}
			className='mt-4 rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition'
		>
			Sign out
		</button>
	);
}
