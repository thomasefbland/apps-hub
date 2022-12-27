import { TIKTOK_API_KEYS } from '$env/static/private';
const API_KEYS = {
	tiktok: JSON.parse(TIKTOK_API_KEYS)
} as const;

function validateKey(key: string, appId: string): boolean {
	const apiKeys = API_KEYS[appId as keyof typeof API_KEYS];
	if (!Array.isArray(apiKeys)) return false;
	return apiKeys.find((k) => k === key) !== undefined;
}
export default validateKey;
