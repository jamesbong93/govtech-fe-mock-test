import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchTrafficImagesBegin } from '../features/trafficImages/trafficImagesSlice';

interface TrafficDisplayProps {
	selectedDate: Date;
}

const TrafficDisplay: React.FC<TrafficDisplayProps> = ({ selectedDate }) => {
	const dispatch = useDispatch();
	const { trafficImages, loading, error } = useSelector((state: RootState) => state.trafficImages);

	useEffect(() => {
		dispatch(fetchTrafficImagesBegin(selectedDate));
	}, [dispatch, selectedDate]);

	// Render logic for loading, error, and displaying images
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	// Render images
	return (
		<div>
			<h3>Traffic Information for {selectedDate.toString()}</h3>
			{trafficImages ? <div>
				{trafficImages.map((image, index) => (
					<div key={index}>
						<p>Camera ID: {image.camera_id}</p>
						<img 
							src={image.image} 
							alt={`Traffic view from camera ${image.camera_id}`}
							style={{ width: '200px', height: '150px' }} // Standard size
						/>
						<p>Timestamp: {image.timestamp}</p>
					</div>
				))}
			</div> : <div>No traffic images being found</div>}
		</div>
	);
};

export default TrafficDisplay;
