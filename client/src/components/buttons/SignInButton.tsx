'use client';

// Next Imports
import { useRouter } from 'next/navigation';

export default function SignInButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push('/sign-in')}
			className='mt-4 rounded-full bg-foreground text-background px-6 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition'
		>
			Sign in
		</button>
	);
}
