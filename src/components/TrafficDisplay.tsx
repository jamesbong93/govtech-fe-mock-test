import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchTrafficImagesBegin } from "../features/trafficImages/trafficImagesSlice";

interface TrafficDisplayProps {
	selectedDate: Date;
	selectedLocation: string;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({ selectedDate, selectedLocation }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  console.log(state);

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
  }

  // Render logic for loading, error, and displaying images
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
	
  // Render images
  return (
    <div>
      <h3>Traffic Information for {selectedDate.toString()}</h3>
      {trafficImages ? <div>
        {trafficImages.filter(image => image.location.address === selectedLocation)
          .map((image, index) => (
            <div key={index}>

              <p>Location: {image.location.address} ({image.location.area})</p>
              <img 
                src={image.image} 
                alt={`Traffic view from camera ${image.camera_id}`}
                style={{ width: "200px", height: "150px" }} // Standard size
              />
              <p>Timestamp: {image.timestamp}</p>
            </div>
          ))}
      </div> : <div>No traffic images being found</div>}
    </div>
  );
};

export default TrafficDisplay;
