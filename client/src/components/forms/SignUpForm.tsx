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
import { RegistrationError } from '@/types/django-auth';

// Util Imports
import { popUp } from '@/utils/pop-up';

// Component Imports
import ProviderButtons from '../buttons/ProviderButtons';

const SignUpForm = () => {
	const router = useRouter();
	const { status } = useSession();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<RegistrationError>();

	useEffect(() => {
		const setAuthIntentCookie = async () => {
			await setCookie('authIntent', 'signup');
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

		if (password !== confirmPassword) {
			setErrors({ password1: ['Passwords do not match.'] });
			return;
		}

		const result = await signIn('credentials', {
			username,
			email,
			first_name: firstName,
			last_name: lastName,
			password1: password,
			password2: password,
			redirect: false,
		});

		handleSignIn(result);
	};

	const onSignIn = async (provider: ClientSafeProvider) => {
		/* const result = await signIn(provider.id);

		handleSignIn(result); */

		popUp('/auth-pop-up', `${provider.name} Sign Up`, {
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
		<div className='max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg'>
			<h1 className='text-2xl font-semibold text-center mb-6'>Sign Up</h1>

			{/* Sign Up form */}
			<form className='space-y-6' onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor='username'
						className='block text-sm font-medium text-gray-700'
					>
						Username
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
					{errors?.username?.map((error, index) => (
						<p className='text-red-500 text-sm mt-1' key={index}>
							{error}
						</p>
					))}
				</div>
				<div>
					<label
						htmlFor='firstName'
						className='block text-sm font-medium text-gray-700'
					>
						First Name
					</label>
					<input
						id='firstName'
						name='firstName'
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div>
					<label
						htmlFor='lastName'
						className='block text-sm font-medium text-gray-700'
					>
						Last Name
					</label>
					<input
						id='lastName'
						name='lastName'
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Email
					</label>
					<input
						id='email'
						name='email'
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
					{errors?.email?.map((error, index) => (
						<p className='text-red-500 text-sm mt-1' key={index}>
							{error}
						</p>
					))}
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
					{errors?.password1?.map((error, index) => (
						<p className='text-red-500 text-sm mt-1' key={index}>
							{error}
						</p>
					))}
				</div>
				<div>
					<label
						htmlFor='confirmPassword'
						className='block text-sm font-medium text-gray-700'
					>
						Confirm Password
					</label>
					<input
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'
				>
					Sign Up
				</button>
			</form>

			{/* OR separator */}
			<div className='my-6 flex items-center'>
				<div className='w-full border-t border-gray-300' />
				<span className='px-3 text-gray-500'>OR</span>
				<div className='w-full border-t border-gray-300' />
			</div>

			{/* Social login buttons */}
			<ProviderButtons authIntent='signup' onSignIn={onSignIn} />

			{/* Sign In prompt */}
			<p className='text-center text-gray-600 mt-4'>
				Already have an account?{' '}
				<button
					onClick={() => router.push('/sign-in')}
					className='text-indigo-600 hover:underline'
				>
					Sign In
				</button>
			</p>
		</div>
	);
};

export default SignUpForm;
