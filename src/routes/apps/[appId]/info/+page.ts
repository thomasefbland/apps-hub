import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = (async ({ params, parent }) => {
	const { appsinfo } = await parent();
	const appinfo = appsinfo.find((app) => app.id === params.appId.toLowerCase());
	if (appinfo == null) throw error(404);
	return {
		appinfo: appinfo,
		title: appinfo.name
	};
}) satisfies PageLoad;
