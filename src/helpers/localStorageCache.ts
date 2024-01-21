export function setLocalStorageCache(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageCache(key: string): any | null {
	const value = localStorage.getItem(key);
	if (value) {
		return JSON.parse(value);
	}
	
	return null;
}