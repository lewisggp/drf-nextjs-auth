'use client';

// React Imports
import { useEffect, useState } from 'react';

// Next imports
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Server Actions
import { getCookie } from '@/app/actions/cookieActions';

const AuthErrorPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get('error');
	const [countdown, setCountdown] = useState(5);

	const errorMessages: { [key: string]: string } = {
		OAuthAccountNotLinked:
			'This account is already linked with another provider.',
		OAuthCallbackError:
			'There was a problem with the provider authentication.',
		CredentialsSignin: 'Error with the provided credentials.',
		Configuration: 'Configuration error.',
		default: 'An unknown error occurred.',
	};

	const errorMessage =
		errorMessages[error as string] || JSON.parse(error as string).detail;

	useEffect(() => {
		const timer = setTimeout(async () => {
			const authIntent = await getCookie('authIntent');
			if (authIntent?.value === 'signup') router.push('/sign-up');
			else if (authIntent?.value === 'signin') router.push('/sign-in');
			else router.push('/');
		}, countdown * 1000);

		return () => clearTimeout(timer);
	}, [router, countdown]);

	useEffect(() => {
		if (countdown > 0) {
			const interval = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [countdown]);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
			<div className='max-w-md w-full p-8 border border-gray-300 rounded-lg shadow-lg bg-white'>
				<h1 className='text-2xl font-semibold text-center mb-6'>
					Authentication Error
				</h1>

				<p className='text-center text-gray-700 mb-4'>{errorMessage}</p>

				<div className='flex justify-center'>
					<Link href='/' className='text-indigo-600 hover:underline'>
						Return to the main page
					</Link>
				</div>

				<p className='text-center text-gray-500 mt-4'>
					Redirecting in {countdown} seconds...
				</p>
			</div>
		</div>
	);
};

export default AuthErrorPage;
