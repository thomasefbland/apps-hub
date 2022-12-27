import type { PageLoad } from './$types';

export const load = (() => {
	return {
		title: 'Apps'
	};
}) satisfies PageLoad;
