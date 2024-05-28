import axios from "axios";
const mapboxAccessToken = "pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g";

export default async function fetchElevation(lat,lng) {
  const url = `https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?access_token=${mapboxAccessToken}`;

  try {
    const response = await axios.get(url);
    const contourFeature = response.data.features.find(
      (feature) => feature.properties.tilequery.layer === "contour"
    );

    if (contourFeature && contourFeature.properties.ele) {
      const elevationValue = contourFeature.properties.ele;
      console.log("Elevation:", elevationValue);
      return elevationValue
      // You can call setElevation here if you have a state variable for elevation
    } else {
      console.error("Elevation data not found in the API response");
    }
  } catch (error) {
    console.error("Error fetching elevation:", error);
  }
};



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

  