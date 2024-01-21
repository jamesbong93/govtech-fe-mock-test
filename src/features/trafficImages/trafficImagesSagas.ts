import { call, put, takeLatest } from 'redux-saga/effects';
import { 
	fetchTrafficImagesBegin,
  fetchTrafficImagesSuccess, 
  fetchTrafficImagesFailure 
} from './trafficImagesSlice';
import { TrafficImage } from './types';

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
    
    // Get the first item from response items which contain all the cameras data
    if (data.items.length > 0) {
      const cameras = data.items[0].cameras;

      yield put(fetchTrafficImagesSuccess(cameras));
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
