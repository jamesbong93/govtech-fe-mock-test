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

// Worker Saga
function* fetchTrafficImagesSaga() {
	console.log("fetchTrafficImagesSaga")
  try {
    const response:ResponseGenerator = yield call(fetch, 'https://api.data.gov.sg/v1/transport/traffic-images');

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
