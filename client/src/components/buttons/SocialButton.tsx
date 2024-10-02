// React Imports
import React from 'react';

// Third-party Imports
import {
	signIn,
	ClientSafeProvider,
	SignInOptions,
	SignInResponse,
} from 'next-auth/react';

interface SocialButtonProps {
	authIntent: 'signin' | 'signup';
	provider: ClientSafeProvider;
	options?: SignInOptions;
	onSignIn?: (result: SignInResponse | undefined) => void;
}

export default function SocialButton({
	authIntent,
	provider,
	options,
	onSignIn,
}: SocialButtonProps) {
	const handleSignIn = async () => {
		const result = await signIn(provider.id, options);

		if (onSignIn) {
			onSignIn(result);
		}
	};

	return (
		<button
			key={provider.id}
			className={`w-full py-2 px-4 text-white rounded-md hover:opacity-90 transition-opacity ${
				provider.id === 'google'
					? 'bg-red-500'
					: provider.id === 'facebook'
					? 'bg-blue-600'
					: provider.id === 'twitter'
					? 'bg-blue-400'
					: provider.id === 'github'
					? 'bg-gray-800'
					: ''
			}`}
			onClick={handleSignIn}
		>
			{authIntent == 'signin'
				? `Sign in with ${provider.name}`
				: `Sign up with ${provider.name}`}
		</button>
	);
}
