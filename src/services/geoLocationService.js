/* eslint-disable import/prefer-default-export */
import { getDistance } from 'geolib';

export const getMinDistanceMarker = (currentPosition, places) => {
  let position;
  let minDistance;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < places.length; i++) {
    const { latitude, longitude } = places[i];
    const distance = getDistance(currentPosition, { latitude, longitude });
    
    if (i === 0) minDistance = distance;
    else if (minDistance > distance) {
      position = i;
    }
  }
  return position;
};
