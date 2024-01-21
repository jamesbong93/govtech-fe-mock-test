export interface TrafficImage {
	camera_id: string;
	image: string;
	image_metadata: ImageMetadata;
	location: Location;
	timestamp: string;
}
  
interface ImageMetadata {
	height: number;
	md5: string;
	width: number;
}

export interface Location {
	address: string;
	area: string;
	latitude: number;
	longitude: number;
}

export interface TrafficImagesState {
  trafficImages: TrafficImage[];
	selectedDate: Date | null;
	selectedLocation: string | null;
	locationList: Location[];
  loading: boolean;
  error: string | null;
}

// Action type constants
export const FETCH_TRAFFIC_IMAGES_BEGIN = 'FETCH_TRAFFIC_IMAGES_BEGIN';
export const FETCH_TRAFFIC_IMAGES_SUCCESS = 'FETCH_TRAFFIC_IMAGES_SUCCESS';
export const FETCH_TRAFFIC_IMAGES_FAILURE = 'FETCH_TRAFFIC_IMAGES_FAILURE';
  
  