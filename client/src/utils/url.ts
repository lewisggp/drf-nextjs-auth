export const makeUrl = (...endpoints: string[]) => {
	const url = endpoints.reduce((prevUrl, currentPath) => {
		if (prevUrl.length === 0) {
			return prevUrl + currentPath;
		}

		return prevUrl.endsWith('/')
			? prevUrl + currentPath + '/'
			: prevUrl + '/' + currentPath + '/';
	}, '');

	return url;
};
