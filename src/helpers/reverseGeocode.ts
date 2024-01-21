import { getLocalStorageCache, setLocalStorageCache } from "./localStorageCache";

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
	// TODO: 
	// Relocate Google API call to the server-side to enhance caching efficiency 
	// and to secure the API key (keeping it hidden from the client-side).

	// Verify if the result already exists in the local storage cache to prevent unnecessary duplicate API calls.
	const cacheKey = `geocode:${lat},${lng}`;
	const cachedResult = getLocalStorageCache(cacheKey);
	if (cachedResult) {
		return Promise.resolve(cachedResult);
	}

	const apiKey = '<REPLACE_WITH_YOUR_GOOGLE_API_KEY>'
	const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
	
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		
		if (data.results.length > 0) {
			const locationName = data.results[0].formatted_address

			// Store in local storage
			setLocalStorageCache(cacheKey, locationName);

			return locationName;
		} else {
			return 'Unknown location';
		}
	} catch (error) {
		console.error('Error during reverse geocoding:', error);
		return 'Error fetching location name';
	}
}
