import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

import appsinfo from '$lib/appsinfo.json';
import shortcutsinfo from '$lib/shortcutsinfo.json';

export const load: LayoutLoad = (async ({ url }) => {
	if (url.pathname === '/') throw redirect(301, '/apps');
	return {
		appsinfo: appsinfo,
		shortcutsinfo: shortcutsinfo
	};
}) satisfies LayoutLoad;
