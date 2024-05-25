export function createSegments(coordsArray, attributesObject) {
    const { length, thikness, year } = attributesObject;
    const elevation = 130; // Assuming elevation is a constant value
  
    return coordsArray.map((coordsSubArray) => {
      const coords = coordsSubArray.map((coord) => ({
        latitude: coord.lat,
        longitude: coord.lng,
      }));
  
      return {
        coords: [coords],
        attributes: [
          { name: "length", value: length[0].toString() },
          { name: "thikness", value: thikness[0] },
          { name: "year", value: year[0] },
          { name: "elevation", value: elevation },
        ],
      };
    });
  }


  export function convertData(inputData, additionalData) {
    const { id, latlngs, newTotalDistance } = inputData[0];
    const { largeur, type, nature, from, to, length, thikness, year } = additionalData;
  
    const formattedCoords = latlngs[0].map(({ lat, lng }) => ({
      latitude: lat,
      longitude: lng
    }));
  
    const output = {
      from_id: from,
      to_id: to,
      length: length[0] + length[1],
      coords: formattedCoords,
      connectionType: "direct",
      type,
      nature,
      newTotalDistance
    };
    return output;

}