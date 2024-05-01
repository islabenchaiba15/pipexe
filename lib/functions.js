export function splitCoordinates(coordinates, distances) {
    const result = [];
    let currentIndex = 0;
    let currentDistanceIndex = 0;
    let remainingDistance = distances[currentDistanceIndex];
  
    while (currentIndex < coordinates.length) {
      const currentSegment = coordinates[currentIndex];
      const segmentLength = parseFloat(currentSegment.newTotalDistance);
  
      if (segmentLength <= remainingDistance) {
        // If the entire segment fits within the remaining distance
        if (!result[currentDistanceIndex]) {
          result[currentDistanceIndex] = [];
        }
        result[currentDistanceIndex].push(currentSegment);
        remainingDistance -= segmentLength;
        currentIndex++;
      } else {
        // If the segment needs to be split
        const ratio = remainingDistance / segmentLength;
        const splitPointIndex = Math.ceil(currentSegment.latlngs[0].length * ratio);
  
        const newSegment = {
          id: currentSegment.id,
          latlngs: [currentSegment.latlngs[0].slice(0, splitPointIndex)],
          newTotalDistance: remainingDistance.toFixed(2)
        };
  
        if (!result[currentDistanceIndex]) {
          result[currentDistanceIndex] = [];
        }
        result[currentDistanceIndex].push(newSegment);
  
        // Move to the next distance
        currentDistanceIndex++;
        if (currentDistanceIndex < distances.length) {
          remainingDistance = distances[currentDistanceIndex] - remainingDistance;
        } else {
          remainingDistance = 0;
        }
      }
    }
  
    // If there are remaining distances, add empty polylines for them
    for (let i = currentDistanceIndex + 1; i < distances.length; i++) {
      result.push([]);
    }
  
    return result;
  };
  
  // Example usage

  