import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { fetchTrafficImagesBegin } from "features/trafficImages/trafficImagesSlice";
import styles from "./TrafficDisplay.module.css"; // Assuming you're using CSS modules
import { TrafficDisplayProps } from "features/trafficImages/types";


const TrafficDisplay: React.FC<TrafficDisplayProps> = ({ selectedDate, selectedLocation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  let selectedArea = "";

  /**
	 * Represents the TrafficDisplay component.
	 * @component
	 */
  const { trafficImages, locationList, loading, error } = useSelector((state: RootState) => state.trafficImages);
  useEffect(() => {
    dispatch(fetchTrafficImagesBegin(selectedDate));
  }, [dispatch, selectedDate]);

  // Set selectedLocation to the first location of locationList if not found
  if (locationList && selectedLocation === "") {
    selectedLocation = locationList[0]?.address;
    selectedArea = state.trafficImages.locationList[0]?.area;
  }

  const matchedLocation = locationList.find(loc => loc.address === selectedLocation);
  if (matchedLocation) {
    selectedArea = matchedLocation.area;
  }

  // Render logic for loading, error, and displaying images
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
	
  // Render images
  return (
    <div className={styles.trafficContainer}>
      <h2 className={styles.trafficTitle}>
        <p>
          Traffic Images
        </p>
        <p>
          {selectedArea} - {selectedLocation}
        </p>
        <p>
          {selectedDate.toDateString()}, {selectedDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
        </p>
      </h2>
      {trafficImages ? (
        trafficImages.filter(trafficImage => trafficImage.location.address === selectedLocation).map((trafficImage, index) => (
          <div key={index} className={styles.imageCard}>
            <div className={styles.weatherImageContainer}>
              <img 
                src={trafficImage.image} 
                alt={`Traffic view from camera ${trafficImage.camera_id}`} 
                className={styles.trafficImage}
              />
              <div className={styles.imageInfo}>
                <p>Image taken on {new Date(trafficImage.timestamp).toLocaleString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "numeric", minute: "numeric", hour12: true })}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No traffic images found.</p>
      )}
    </div>
  );
};

export default TrafficDisplay;
