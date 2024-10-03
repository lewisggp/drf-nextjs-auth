'use client';

// React Imports
import { useEffect } from 'react';

// Next Imports
import { useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';

const PopUpPage = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		const provider = searchParams.get('provider');

		if (provider) {
			signIn(provider);
		}
	}, [searchParams]);

	return (
		<div
			style={{
				width: '80vw',
				height: '80vh',
				position: 'absolute',
				left: 0,
				top: 0,
				background: 'white',
			}}
		></div>
	);
};

export default PopUpPage;
