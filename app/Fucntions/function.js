export function createSegments(coordsArray, attributesObject, elevations) {
  const { length, thikness, year } = attributesObject;

  return coordsArray.map((coordsSubArray, index) => {
    const getRandomOffset = () => Math.floor(Math.random() * 11) - 5; // Random value between -5 and 5

    const elevation = Math.max(5, Math.min(95, elevations[index] + getRandomOffset()));
    const lengthValue = length[index]  // Use the corresponding value from the length array, or the first value if the index is out of bounds
    const thiknessValue = thikness[index] ; // Use the corresponding value from the thikness array, or the first value if the index is out of bounds
    const yearValue = year[index] ;
    const coords = coordsSubArray.map((coord) => ({
      latitude: coord.lat,
      longitude: coord.lng,
      elivation:elevation
    }));

    return {
      coords: coords,
      attributes: [
        { name: "length", value: lengthValue.toString() },
        { name: "thikness", value: thiknessValue },
        { name: "year", value: yearValue },
      ],
    };
  });
}


  export function convertData(inputData, additionalData) {
    const { id, latlngs, newTotalDistance } = inputData[0];
    const { largeur, type, nature, from, to, length } = additionalData;
  
    const formattedCoords = latlngs[0].map(({ lat, lng }) => ({
      latitude: lat,
      longitude: lng
    }));
  
    const output = {
      from_id: from,
      to_id: to,
      coords: formattedCoords,
      connectionType: "direct",
      type,
      nature,
      newTotalDistance
    };
    return output;

}