import { AreaMetadata } from "features/weatherForecasts/types";

/**
 * Calculates the distance between two coordinates on Earth using the Haversine formula.
 * @param lat1 - The latitude of the first coordinate.
 * @param lng1 - The longitude of the first coordinate.
 * @param lat2 - The latitude of the second coordinate.
 * @param lng2 - The longitude of the second coordinate.
 * @returns The distance between the two coordinates in kilometers.
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRadian = (angle: number): number => (Math.PI / 180) * angle;
    const distance = (a: number, b: number): number => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;
    const dLat = distance(lat2, lat1);
    const dLng = distance(lng2, lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) 
              + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) 
              * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RADIUS_OF_EARTH_IN_KM * c;
}

/**
 * Finds the nearest location based on latitude and longitude coordinates.
 * 
 * @param lat - The latitude coordinate.
 * @param lng - The longitude coordinate.
 * @param locations - An array of AreaMetadata objects representing the available locations.
 * @returns The name of the nearest location, or an empty string if no location is found.
 */
export function findNearestLocation(lat: number, lng: number, locations: AreaMetadata[]): string {
    const nearestLocation = locations.reduce((nearest: AreaMetadata | null, location: AreaMetadata) => {
        const distance = calculateDistance(lat, lng, location.label_location.latitude, location.label_location.longitude);
        return distance < (nearest ? calculateDistance(lat, lng, nearest.label_location.latitude, nearest.label_location.longitude) : Infinity)
            ? location
            : nearest;
    }, null);

    return nearestLocation ? nearestLocation.name : "";
}
