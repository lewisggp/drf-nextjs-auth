// Third-party Imports
import jwt from 'jsonwebtoken';

export const isJwtExpired = (token: string) => {
	const currentTime = Math.round(Date.now() / 1000 + 60);
	const decoded = jwt.decode(token);

	if (decoded && typeof decoded === 'object' && decoded.exp != undefined) {
		const adjustedExpiry = decoded.exp as number;

		if (adjustedExpiry < currentTime) {
			return true;
		}

		return false;
	}

	return true;
};
