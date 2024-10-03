'use client';

// Next Imports
import { useSession } from 'next-auth/react';
import Image from 'next/image';

// Component Imports
import LoadingSpinner from '@/components/loading/LoadingSpinner';
import SignInButton from '@/components/buttons/SignInButton';
import SignOutButton from '@/components/buttons/SignOutButton';

export default function Home() {
	const { data: session, status } = useSession();
	const loading = status === 'loading';

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center'>
				<Image
					className='dark:invert'
					src='https://nextjs.org/icons/next.svg'
					alt='Next.js logo'
					width={180}
					height={38}
					priority
				/>
				{loading ? (
					<div className='mt-4'>
						<LoadingSpinner />
					</div>
				) : !session ? (
					<div className='flex flex-col items-center mt-4'>
						<p className='text-lg'>Not signed in</p>
						<SignInButton />
						<pre className='mt-4 text-sm text-gray-700'>
							User is not logged in
						</pre>
					</div>
				) : (
					<div className='flex flex-col items-center mt-4'>
						{session.user?.email ? (
							<p className='text-lg'>
								Signed in as {session.user?.email}
							</p>
						) : (
							<p className='text-lg'>
								Hello {session.user?.name}!
							</p>
						)}
						<SignOutButton />
						<pre className='mt-4 text-sm text-gray-700'>
							User has access token
						</pre>
					</div>
				)}
			</main>
		</div>
	);
}
