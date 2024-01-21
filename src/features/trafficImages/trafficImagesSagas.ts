import { call, put, takeLatest } from 'redux-saga/effects';
import { 
	fetchTrafficImagesBegin,
	fetchTrafficImagesSuccess, 
	fetchTrafficImagesFailure,
	setLocationList
} from './trafficImagesSlice';
import { TrafficImage, Location } from './types';
import { reverseGeocode } from '../../helpers/reverseGeocode';
import { fetchAreaMetadata, findNearestLocation } from '../../helpers/areaMeta';

interface Item {
	timestamp: string;
	cameras: TrafficImage[];
}

interface ApiInfo {
	status: string;
}

interface FetchResponse {
	items: Item[];
	api_info: ApiInfo;
}

interface ResponseGenerator{
	json:any,
}

// Format date to string format YYYY-MM-DD[T]HH:mm:ss
function formatDateToISOString(date: Date): string {
	const pad = (num: number): string => num.toString().padStart(2, '0');

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

interface Camera {
    // Define the structure of your Camera object
    location: {
        latitude: number;
        longitude: number;
    };
    // ... other properties
}

interface AreaMetadata  {
	name: string;
	label_location: {
        latitude: number;
        longitude: number;
    };
}

function* processLocationList(cameras: Camera[]): Generator<any, Location[], any> {
    const areaMetadata: AreaMetadata[] = yield call(fetchAreaMetadata);
    const locationList: Location[] = [];

    for (const camera of cameras) {
        const { latitude, longitude } = camera.location;
        const nearestLocationArea: string = yield call(findNearestLocation, latitude, longitude, areaMetadata);
        const locationName: string = yield call(reverseGeocode, latitude, longitude);

        const location: Location = {
            address: locationName,
            area: nearestLocationArea,
            latitude: latitude,
            longitude: longitude
        };

        // Add the processed location to the list
        locationList.push(location);
    }

    // Return the final list of locations
    return locationList;
}


// Worker Saga
function* fetchTrafficImagesSaga(action: ReturnType<typeof fetchTrafficImagesBegin>) {
	try {
		if (!action.payload) {
			throw new Error('Selected date is null');
		}
		const formattedDate: string = formatDateToISOString(action.payload);
		const url = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${encodeURIComponent(formattedDate)}`;
		
		const response:ResponseGenerator = yield call(fetch, url);

		const data: FetchResponse = yield call([response, response.json]);
	
	// The 'call' effect is used for calling async functions

	// Get the first item from response items which contain all the cameras data
	if (data.items.length > 0) {
		const cameras = data.items[0].cameras;

		// Resolve locationListpromises and update locationList state
		const locationList: Location[] = yield call(processLocationList, cameras);

		// Update each camera with the corresponding location from locationList
		const updatedCameras = cameras.map(camera => {
			const location = locationList.find(loc => 
					loc.latitude === camera.location.latitude && 
					loc.longitude === camera.location.longitude);

			return {
					...camera,
					location: location || camera.location
			};
		});

		yield put(setLocationList(locationList));

		yield put(fetchTrafficImagesSuccess(updatedCameras));

	} else {
		throw new Error('No items found in response');
	}

	} catch (error) {
	if (error instanceof Error) {
		yield put(fetchTrafficImagesFailure(error.message));
	} else {
		yield put(fetchTrafficImagesFailure("Something went wrong"));
	}
	}
}

// Watcher Saga
export function* watchFetchTrafficImages() {
	yield takeLatest(fetchTrafficImagesBegin, fetchTrafficImagesSaga);
}
