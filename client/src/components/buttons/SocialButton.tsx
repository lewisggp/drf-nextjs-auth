// React Imports
import React from 'react';

// Third-party Imports
import { ClientSafeProvider, signIn } from 'next-auth/react';

interface SocialButtonProps {
	provider: ClientSafeProvider;
	authIntent: 'signin' | 'signup';
}

export default function SocialButton({
	provider,
	authIntent,
}: SocialButtonProps) {
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
			onClick={() => signIn(provider.id, { callbackUrl: '/' })}
		>
			{authIntent == 'signin'
				? `Sign in with ${provider.name}`
				: `Sign up with ${provider.name}`}
		</button>
	);
}
