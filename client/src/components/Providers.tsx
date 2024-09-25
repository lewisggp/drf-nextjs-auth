'use client';

// React Imports
import React from 'react';

// Context Imports
import { NextAuthProvider } from '@/contexts/nextAuthProvider';

export default function Providers({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
			{children}
		</NextAuthProvider>
	);
}
