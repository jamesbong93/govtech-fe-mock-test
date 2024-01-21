/**
 * Fetches a human-readable address from the Google Geocoding API using latitude and longitude.
 * 
 * @param {number} lat - The latitude coordinate.
 * @param {number} lng - The longitude coordinate.
 * @returns {Promise<string>} - A promise that resolves to the human-readable address or an error message.
 */
export async function fetchFromGoogleGeocoding(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Loading the API key from an environment variable

  // Check if the API key is set
  if (!apiKey) {
    console.error("Google API key is not set.");
    return "Error: API key is not set";
  }

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response contains any results
    if (data.results.length > 0) {
      const locationName = data.results[0].formatted_address;
      return locationName;
    } else {
      return "Unknown location";
    }
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return "Error fetching location name";
  }
}
