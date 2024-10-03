// React Imports
import React, { useEffect, useState } from 'react';

// Third-party Imports
import {
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

// Component Imports
import SocialButton from '@/components/buttons/SocialButton';
import LoadingSpinner from '@/components/loading/LoadingSpinner';

interface ProviderButtonsProps {
	authIntent: 'signin' | 'signup';
	onSignIn: (provider: ClientSafeProvider) => void;
}

export default function ProviderButtons({
	authIntent,
	onSignIn,
}: ProviderButtonsProps) {
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
			setLoading(false);
		};

		fetchProviders();
	}, []);

	if (loading) {
		return (
			<div className='mt-4'>
				<LoadingSpinner />
			</div>
		);
	}

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
							onClick={() => onSignIn(provider)}
						/>
					);
				})}
		</div>
	);
}
