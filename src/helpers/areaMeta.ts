export function fetchAreaMetadata() {
    const apiUrl = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.area_metadata;
        })
        .catch(error => {
            console.error('Error fetching area metadata:', error);
            // Depending on your error handling strategy, you may throw the error or return null
            throw error;
        });
}

interface Location {
    name: string;
	label_location: {
        latitude: number;
        longitude: number;
    };
}

/**
 * Calculates the distance between two points on Earth.
 * 
 * @param lat1 Latitude of the first point in decimal degrees
 * @param lng1 Longitude of the first point in decimal degrees
 * @param lat2 Latitude of the second point in decimal degrees
 * @param lng2 Longitude of the second point in decimal degrees
 * @returns Distance between the two points in kilometers
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    // Converts an angle in degrees to radians
    const toRadian = (angle: number): number => (Math.PI / 180) * angle;

    // Calculates the difference between two angles in radians
    const distance = (a: number, b: number): number => (Math.PI / 180) * (a - b);

    // Radius of the Earth in kilometers
    const RADIUS_OF_EARTH_IN_KM = 6371;

    // Difference in latitude and longitude in radians
    const dLat = distance(lat2, lat1);
    const dLng = distance(lng2, lng1);

    // Haversine formula to calculate the distance
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) 
              + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) 
              * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    return RADIUS_OF_EARTH_IN_KM * c;
}

/**
 * Finds the nearest location to a given point.
 * 
 * @param lat Latitude of the reference point in decimal degrees
 * @param lng Longitude of the reference point in decimal degrees
 * @param locations Array of locations to search from
 * @returns The name of the nearest location
 */
export function findNearestLocation(lat: number, lng: number, locations: Location[]): string {
    let nearestLocation: Location | null = null;
    let smallestDistance = Infinity;

    // Iterate through each location to find the nearest one
    locations.forEach(location => {
        // Calculate the distance to this location
        const distance = calculateDistance(lat, lng, location.label_location.latitude, location.label_location.longitude);

        // If this location is closer, update nearestLocation and smallestDistance
        if (distance < smallestDistance) {
            smallestDistance = distance;
            nearestLocation = location;
        }
    });

    // Return the name of the nearest location, if found
    return nearestLocation ? nearestLocation["name"] : "";
}


