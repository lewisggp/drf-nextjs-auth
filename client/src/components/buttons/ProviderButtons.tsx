// React Imports
import React, { useEffect, useState } from 'react';

// Third-party Imports
import {
	ClientSafeProvider,
	getProviders,
	LiteralUnion,
} from 'next-auth/react';

// Component Imports
import SocialButton from './SocialButton';
import { BuiltInProviderType } from 'next-auth/providers/index';

interface ProviderButtonsProps {
	authIntent: 'signin' | 'signup';
}

export default function ProviderButtons({ authIntent }: ProviderButtonsProps) {
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
							provider={provider}
							authIntent={authIntent}
						/>
					);
				})}
		</div>
	);
}
