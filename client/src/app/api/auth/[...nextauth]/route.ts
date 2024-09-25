// Next Auth Imports
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import GitHubProvider from 'next-auth/providers/github';

// Third-party Imports
import axios from 'axios';

// Util Imports
import { makeUrl } from '@/utils/url';
import { isJwtExpired } from '@/utils/jwt';

const handler = NextAuth({
	secret: process.env.NEXTAUTH_SESSION_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: Number(process.env.NEXTAUTH_SESSION_MAX_AGE) || 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	debug: process.env.NODE_ENV === 'development',
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID || '',
			clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
			// version: '2.0', // Enable Twitter OAuth 2.0 (doesn't return email user)
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID || '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (user && account?.provider) {
				const version = account?.access_token ? 'v2' : 'v1';
				const response = await axios.post(
					makeUrl(
						process.env.BACKEND_API_BASE || '',
						'socials',
						'oauth',
						version,
						account.provider
					),
					{
						id_token: account.id_token,
						access_token:
							account.access_token || account.oauth_token,
						token_secret: account.oauth_token_secret,
					}
				);

				return {
					...token,
					accessToken: response.data.access,
					refreshToken: response.data.refresh,
				};
			}

			if (isJwtExpired(token.accessToken as string)) {
				const response = await axios.post(
					makeUrl(
						process.env.BACKEND_API_BASE || '',
						'auth',
						'token',
						'refresh'
					),
					{
						refresh: token.refreshToken,
					}
				);

				if (response.data.access && response.data.refresh) {
					return {
						...token,
						accessToken: response.data.access,
						refreshToken: response.data.refresh,
						iat: Math.floor(Date.now() / 1000),
						exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
					};
				}

				return {
					...token,
					exp: 0,
				};
			}

			return token;
		},

		async session({ session, token }) {
			return {
				...session,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
			};
		},
	},
});

export { handler as GET, handler as POST };
