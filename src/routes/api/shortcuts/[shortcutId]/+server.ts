import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import shortcutsinfo from '$lib/shortcutsinfo.json';

export const GET = (async ({ params }) => {
	const shortcutinfo = shortcutsinfo.find((shortcut) => shortcut.id === params.shortcutId.toLowerCase());
	if (shortcutinfo == null) throw error(404, 'Could not find the requested app');
	return json(shortcutinfo);
}) satisfies RequestHandler;
