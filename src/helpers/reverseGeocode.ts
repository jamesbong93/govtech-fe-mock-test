import { fetchFromGoogleGeocoding } from "api/googleAPI";
import { getLocalStorageCache, setLocalStorageCache } from "./localStorageCache";

/**
 * Performs reverse geocoding to get a human-readable address from latitude and longitude coordinates.
 * 
 * @param {number} lat - The latitude coordinate.
 * @param {number} lng - The longitude coordinate.
 * @returns {Promise<string>} - A promise that resolves to the address of the given coordinates.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
    // Construct a unique key for caching based on the latitude and longitude
    const cacheKey = `geocode:${lat},${lng}`;

    // Attempt to retrieve the cached result for these coordinates
    const cachedResult = getLocalStorageCache(cacheKey);
    if (cachedResult) {
      return Promise.resolve(cachedResult);
    }

    try {
        // Fetch the location name using the Google Geocoding API
        const locationName = await fetchFromGoogleGeocoding(lat, lng);

        // Cache the fetched result for future use
        setLocalStorageCache(cacheKey, locationName);

        return locationName;
    } catch (error) {
        console.error('Error during reverse geocoding:', error);
        return 'Error fetching location name';
    }
}
