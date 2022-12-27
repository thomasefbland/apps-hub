import validateKey from '$lib/server/keys.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type VideoData = {
	id: string;
	author: string;
	downloadURL: string;
};

async function getData(url: string) {
	const response = await fetch(url);
	const text = await response.text();

	const videoIdSplitIndex1SearchString = '"list":\\[';
	const videoIdSplitIndex1 = text.search(videoIdSplitIndex1SearchString);
	const videoIdSplitIndex2 = text.search('"],"browserList"');
	const videoId = text.substring(videoIdSplitIndex1 + videoIdSplitIndex1SearchString.length, videoIdSplitIndex2);

	const textFragment = text.split('shortId":"')[1];
	const authorIdSplitIndex1SearchString = '"uniqueId":"';
	const authorIdSplitIndex1 = textFragment.search(authorIdSplitIndex1SearchString);
	const authorIdSplitIndex2 = textFragment.search('","nickname"');
	const authorId = textFragment.substring(authorIdSplitIndex1 + authorIdSplitIndex1SearchString.length, authorIdSplitIndex2);

	const downloadAddrSplitIndex1SearchString = '"downloadAddr":';
	const downloadAddrSplitIndex1 = text.search(downloadAddrSplitIndex1SearchString);
	const downloadAddrSplitIndex2 = text.search(',"shareCover":');
	let downloadURL = text.substring(downloadAddrSplitIndex1 + downloadAddrSplitIndex1SearchString.length, downloadAddrSplitIndex2);

	downloadURL = decodeURIComponent(JSON.parse(downloadURL)) + '&d=1';

	const data: VideoData = {
		id: videoId,
		author: authorId,
		downloadURL: downloadURL
	};
	return data;
}

export const GET = (async ({ url }) => {
	const apiKey = url.searchParams.get('api_key');
	if (apiKey == null) throw error(401, 'No API Key was provided.');
	const validKey = validateKey(apiKey, 'tiktok');
	if (!validKey) throw error(403, 'Invalid API Key.');

	const tiktokURL = url.searchParams.get('url');
	if (tiktokURL == null) throw error(400, 'No video URL was provided.');
	if (!tiktokURL.startsWith('https://www.tiktok.com')) throw error(400, 'The provided URL is not supported by this API.');

	try {
		const data = await getData(tiktokURL);
		return json(data);
	} catch (e) {
		throw error(500, 'There was a problem getting the data for this video.');
	}
}) satisfies RequestHandler;
