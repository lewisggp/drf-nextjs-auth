'use server';

// Next Imports
import { cookies } from 'next/headers';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export async function setCookie(
	name: string,
	value: string,
	options?: ResponseCookie
) {
	const cookieStore = cookies();

	cookieStore.set(name, value, options);
}

export async function getCookie(name: string) {
	const cookieStore = cookies();

	return cookieStore.get(name);
}
