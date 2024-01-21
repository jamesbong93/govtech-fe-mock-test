import { all } from 'redux-saga/effects';
import { watchFetchTrafficImages } from './features/trafficImages/trafficImagesSagas';

export default function* rootSaga() {
  yield all([
    watchFetchTrafficImages()
  ]);
}
