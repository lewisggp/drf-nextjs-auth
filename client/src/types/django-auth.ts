export interface UserResponse {
	pk: number;
	username: string;
	email: string;
	first_name: string;
	last_name: string;
}

export interface AuthResponse {
	user: UserResponse;
	access: string;
	refresh: string;
}

export interface LoginError {
	non_field_errors: string[];
}

export interface RegistrationError {
	username?: string[];
	email?: string[];
	password1?: string[];
	password2?: string[];
}

export function isAuthResponse(response: unknown): response is AuthResponse {
	return (
		typeof response === 'object' &&
		response !== null &&
		'user' in response &&
		'access' in response &&
		'refresh' in response
	);
}

export function isLoginError(response: unknown): response is LoginError {
	return (
		typeof response === 'object' &&
		response !== null &&
		'non_field_errors' in response
	);
}

export function isRegistrationError(
	response: unknown
): response is RegistrationError {
	return (
		typeof response === 'object' &&
		response !== null &&
		('username' in response ||
			'email' in response ||
			'password1' in response ||
			'password2' in response)
	);
}

export function isAuthError(
	response: unknown
): response is LoginError | RegistrationError {
	return isLoginError(response) || isRegistrationError(response);
}
