'use client';

// React Imports
import { useEffect, useState } from 'react';

// Next Imports
import { useRouter } from 'next/navigation';

// Third-party Imports
import {
	ClientSafeProvider,
	signIn,
	SignInResponse,
	useSession,
} from 'next-auth/react';

// Server Actions
import { setCookie } from '@/app/actions/cookieActions';

// Type Imports
import { LoginError } from '@/types/django-auth';

// Util Imports
import { popUp } from '@/utils/pop-up';

// Component Imports
import ProviderButtons from '@/components/buttons/ProviderButtons';

const SignInForm = () => {
	const router = useRouter();
	const { status } = useSession();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<LoginError>();

	useEffect(() => {
		const setAuthIntentCookie = async () => {
			await setCookie('authIntent', 'signin');
		};

		setAuthIntentCookie();
	}, []);

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/');
		}
	}, [status, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = await signIn('credentials', {
			username,
			password,
			redirect: false,
		});

		handleSignIn(result);
	};

	const onSignIn = async (provider: ClientSafeProvider) => {
		/* const result = await signIn(provider.id);

		handleSignIn(result); */

		popUp('/auth-pop-up', `${provider.name} Sign In`, {
			provider: provider.id,
		});
	};

	const handleSignIn = (result?: SignInResponse) => {
		if (result?.error) {
			setErrors(JSON.parse(result?.error));
		} else {
			router.push('/');
		}
	};

	return (
		<div className='w-80 mx-auto p-8 border border-gray-300 rounded-lg shadow-lg'>
			<h1 className='text-2xl font-semibold text-center mb-6'>Sign In</h1>

			{errors?.non_field_errors?.map((error, index) => (
				<p className='text-red-500 text-sm m-1 text-center' key={index}>
					{error}
				</p>
			))}

			{/* Credentials form */}
			<form className='space-y-6' onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700'
					>
						Username or Email
					</label>
					<input
						id='username'
						name='username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Password
					</label>
					<input
						id='password'
						name='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
				>
					Sign In
				</button>
			</form>

			{/* OR separator */}
			<div className='my-6 flex items-center'>
				<div className='w-full border-t border-gray-300' />
				<span className='px-3 text-gray-500'>OR</span>
				<div className='w-full border-t border-gray-300' />
			</div>

			{/* Social login buttons */}
			<ProviderButtons authIntent='signin' onSignIn={onSignIn} />

			{/* Sign Up prompt */}
			<p className='text-center text-gray-600 mt-4'>
				Don’t have an account?{' '}
				<button
					onClick={() => router.push('/sign-up')}
					className='text-indigo-600 hover:underline'
				>
					Sign Up
				</button>
			</p>
		</div>
	);
};

export default SignInForm;
