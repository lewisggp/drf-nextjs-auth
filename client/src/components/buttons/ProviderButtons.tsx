// React Imports
import React, { useEffect, useState } from 'react';

// Third-party Imports
import {
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
	SignInOptions,
	SignInResponse,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

// Component Imports
import SocialButton from './SocialButton';

interface ProviderButtonsProps {
	authIntent: 'signin' | 'signup';
	options?: SignInOptions;
	onSignIn?: (result: SignInResponse | undefined) => void;
}

export default function ProviderButtons({
	authIntent,
	options,
	onSignIn,
}: ProviderButtonsProps) {
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};

		fetchProviders();
	}, []);

	return (
		<div className='space-y-4'>
			{providers &&
				Object.values(providers).map((provider) => {
					if (provider.id === 'credentials') return null;
					return (
						<SocialButton
							key={provider.name}
							authIntent={authIntent}
							provider={provider}
							options={options}
							onSignIn={onSignIn}
						/>
					);
				})}
		</div>
	);
}
