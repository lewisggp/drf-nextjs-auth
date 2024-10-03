'use client';

// React Imports
import { useEffect } from 'react';

// Next Imports
import { useSearchParams } from 'next/navigation';

import { signIn, useSession } from 'next-auth/react';

const PopUpPage = () => {
	const searchParams = useSearchParams();
	const { status } = useSession();

	useEffect(() => {
		const provider = searchParams.get('provider');

		if (status === 'authenticated') {
			window.close();
		}

		if (provider) {
			signIn(provider);
		}
	}, [searchParams, status]);

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
