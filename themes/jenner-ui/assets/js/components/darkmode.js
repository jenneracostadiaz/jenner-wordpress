let currentTheme =
	localStorage.getItem('theme-mode') ||
	(window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

const themeMode = () => {
	let currentTheme =
		document.documentElement.getAttribute('data-theme');
	const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', targetTheme);
	localStorage.setItem('theme-mode', targetTheme);
};
