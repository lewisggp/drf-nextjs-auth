export const makeUrl = (...endpoints: (string | false | undefined)[]) => {
	const url = endpoints.reduce((prevUrl, currentPath) => {
		if (!currentPath || currentPath == '') return prevUrl;
		if (!currentPath.endsWith('/')) currentPath += '/';

		return prevUrl + currentPath;
	}, '');

	return `${url}`;
};
