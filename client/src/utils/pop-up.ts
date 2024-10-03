export const popUp = (
	url: string,
	title: string,
	params?: Record<string, string>
) => {
	const dualScreenLeft = window.screenLeft ?? window.screenX;
	const dualScreenTop = window.screenTop ?? window.screenY;

	const width =
		window.innerWidth ??
		document.documentElement.clientWidth ??
		screen.width;

	const height =
		window.innerHeight ??
		document.documentElement.clientHeight ??
		screen.height;

	const systemZoom = width / window.screen.availWidth;

	const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
	const top = (height - 550) / 2 / systemZoom + dualScreenTop;

	const queryParams = new URLSearchParams(params).toString();
	const fullUrl = `${url}?${queryParams}`;

	const newWindow = window.open(
		fullUrl,
		title,
		`width=${500 / systemZoom},height=${
			550 / systemZoom
		},top=${top},left=${left}`
	);

	newWindow?.focus();
};
