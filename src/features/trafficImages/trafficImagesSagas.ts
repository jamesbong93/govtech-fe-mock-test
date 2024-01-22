import { call, put, takeLatest } from "redux-saga/effects";
import { 
  fetchTrafficImagesBegin,
  fetchTrafficImagesSuccess, 
  fetchTrafficImagesFailure,
  setLocationList
} from "./trafficImagesSlice";
import { TrafficImage, Location } from "./types";
import { reverseGeocode } from "helpers/reverseGeocode";
import { findNearestLocation } from "helpers/calculateLocation";
import { formatDateToISOString } from "helpers/commons"; 
import { fetchTrafficImages, fetchWeatherForecastsMetaData } from "api/govTechDataAPI";
import { AreaMetadata } from "features/weatherForecasts/types";


async function processLocationList(trafficImages: TrafficImage[]): Promise<Location[]> {
  const areaMetadata: AreaMetadata[] = await fetchWeatherForecastsMetaData();
  const locationList: Location[] = [];

  for (const trafficImage of trafficImages) {
    const { latitude, longitude } = trafficImage.location;
    const nearestLocationArea: string = findNearestLocation(latitude, longitude, areaMetadata);
    const locationName: string = await reverseGeocode(latitude, longitude);

    const location: Location = {
      address: locationName,
      area: nearestLocationArea,
      latitude,
      longitude
    };

    locationList.push(location);
  }

  // Sort locationList by area in ascending order
  locationList.sort((a, b) => a.area.localeCompare(b.area));

  return locationList;
}

/**
 * Worker Saga: Fetches traffic images and processes their locations.
 * @param {ReturnType<typeof fetchTrafficImagesBegin>} action - The action payload containing the selected date.
 */
function* fetchTrafficImagesSaga(action: ReturnType<typeof fetchTrafficImagesBegin>) {
  try {
    if (!action.payload) {
      throw new Error("Selected date is null");
    }

    const formattedDate: string = formatDateToISOString(action.payload);
    const trafficImages: TrafficImage[] = yield call(fetchTrafficImages, formattedDate);

    if (trafficImages && trafficImages.length > 0) {
      const locationList: Location[] = yield call(processLocationList, trafficImages);

      const updatedTrafficImages = trafficImages?.map(trafficImage => {
        const location = locationList.find(loc => 
          loc.latitude === trafficImage.location.latitude && 
            loc.longitude === trafficImage.location.longitude
        );

        return {
          ...trafficImage,
          location: location || trafficImage.location
        };
      });

      yield put(setLocationList(locationList));
      yield put(fetchTrafficImagesSuccess(updatedTrafficImages));
    } else {
      throw new Error("No traffic images found.");
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchTrafficImagesFailure(error.message));
    } else {
      yield put(fetchTrafficImagesFailure("Something went wrong"));
    }
  }
}

/**
 * Watcher Saga: Watches for the `fetchTrafficImagesBegin` action and starts the worker saga.
 */
export function* watchFetchTrafficImages() {
  yield takeLatest(fetchTrafficImagesBegin, fetchTrafficImagesSaga);
}
