import { TrafficImage } from 'features/trafficImages/types';
import { AreaMetadata, WeatherForecasts } from 'features/weatherForecasts/types';

// Define the base URL for the API
const BASE_URL = 'https://api.data.gov.sg/v1';

// Define the interface for the response items structure
interface FetchResponseItems {
  items: any[];
}

/**
 * Fetches traffic images for a specified date.
 * 
 * @param {string} date - The date for which to fetch traffic images.
 * @returns {Promise<TrafficImage[]>} - A promise resolving to an array of TrafficImage objects.
 */
export const fetchTrafficImages = async (date: string): Promise<TrafficImage[]> => {
    try {
        const response = await fetch(`${BASE_URL}/transport/traffic-images?date_time=${encodeURIComponent(date)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: FetchResponseItems = await response.json();
        return data.items.length > 0 ? data.items[0].cameras : [];
    } catch (error) {
        console.error('Error fetching traffic images:', error);
        throw error;
    }
};

/**
 * Fetches weather forecast data for a specified date.
 * 
 * @param {string} date - The date for which to fetch weather forecasts.
 * @returns {Promise<WeatherForecasts>} - A promise resolving to a WeatherForecasts object.
 */
export const fetchWeatherForecastsItems = async (date: string): Promise<WeatherForecasts> => {
    try {
        const response = await fetch(`${BASE_URL}/environment/2-hour-weather-forecast?date_time=${encodeURIComponent(date)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: FetchResponseItems = await response.json();
        return data.items.length > 0 ? data.items[0] : [];
    } catch (error) {
        console.error('Error fetching weather forecasts items:', error);
        throw error;
    }
};

/**
 * Fetches metadata for weather forecast areas.
 * 
 * @returns {Promise<AreaMetadata[]>} - A promise resolving to an array of AreaMetadata objects.
 */
export const fetchWeatherForecastsMetaData = async (): Promise<AreaMetadata[]> => {
    try {
        const response = await fetch(`${BASE_URL}/environment/2-hour-weather-forecast`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: any = await response.json();
        return data.area_metadata.length > 0 ? data.area_metadata : [];
    } catch (error) {
        console.error('Error fetching weather forecasts metadata:', error);
        throw error;
    }
};
