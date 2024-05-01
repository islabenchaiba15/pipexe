'use client'
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl,FeatureGroup} from 'react-leaflet';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {EditControl} from 'react-leaflet-draw'
import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {data} from '../constants/data';
import L, {  Icon } from 'leaflet';
import { puits } from '../constants/achraf';
import Image from 'next/image';
import Control from "react-leaflet-custom-control";
import RightSideBar from './shared/RightSideBar';



function splitCoordinatesByDistance(coordinates, distances) {
  try {
    const totalDistance = parseFloat(coordinates[0].newTotalDistance);

    // Ensure desired distances are valid
    const validDistances = distances.map((d) => Math.min(d, totalDistance));
    const hasInvalidDistance = validDistances.some((d) => d === 0);

    if (hasInvalidDistance) {
      console.warn('One or more desired distances exceed the total distance.');
      return []; // Handle invalid distances gracefully
    }

    const polylineLengths = validDistances;
    const totalDesiredDistance = validDistances.reduce((acc, d) => acc + d, 0);

    let currentPolyline = []; // Initialize as an empty array
    let currentDistance = 0;
    const splitPolylines = [];

    const calculateDistance = (point1, point2) => {
      // Replace with your preferred distance calculation function (e.g., Haversine formula)
      const lat1 = point1.lat;
      const lng1 = point1.lng;
      const lat2 = point2.lat;
      const lng2 = point2.lng;
      return Math.sqrt((lat2 - lat1) ** 2 + (lng2 - lng1) ** 2);
    };

    for (const point of coordinates[0].latlngs[0]) {
      let distanceToNextPoint; // Define distanceToNextPoint variable here
      if (currentPolyline.length) {
        distanceToNextPoint = calculateDistance(currentPolyline[currentPolyline.length - 1], point);
        // ... rest of your logic
      } else {
        currentPolyline.push(point);
        continue;
      }

      // Check if distance exceeds current polyline length and remaining distance
      if (currentDistance + distanceToNextPoint > polylineLengths[0] &&
          currentDistance + distanceToNextPoint > totalDesiredDistance) {
        splitPolylines.push(currentPolyline);
        currentPolyline = [point];
        currentDistance = distanceToNextPoint;
        polylineLengths.shift(); // Move to the next desired distance
      } else {
        currentPolyline.push(point);
        currentDistance += distanceToNextPoint;
      }
    }

    // Handle remaining distance if polyline is longer than desired distances
    if (currentPolyline.length) {
      splitPolylines.push(currentPolyline);
    }

    return splitPolylines;
  } catch (error) {
    console.error('Error splitting coordinates:', error);
    return []; // Handle errors gracefully
  }
}







const Map = ({ locations,colors,setTotalDistance }) => {
  const coordinates = [
    {
      id: 544,
      latlngs: [
        [
          { lat: 31.839066018972925, lng: 5.064565146929577 },
          { lat: 31.76086695137955, lng: 5.280161613407317 },
          { lat: 31.855397761567097, lng: 5.527342275611132 },
        ],
      ],
      newTotalDistance: "47766.20",
    },
  ];
  const distances = [300, 400, 500];
  const [active,setActive]=useState(false)
  const center = [31.68121343655558,6.141072936328754]; 
  const editRef = useRef(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const healthIcon =L.icon({
    iconUrl: "islam.png",
    iconSize: [35, 35], // size of the icon
  });
  const pui = puits.features
  const dataa=data.features
  // const coordinates = data.features[0].geometry.coordinates;
  console.log(data.features[0])
  const [selectedLayer, setSelectedLayer] = useState('OpenStreetMap');
  const mapboxAccessToken="pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g"
  
  const handleLayerChange = (layer) => {
    setSelectedLayer(layer);
  };
  const [maplayers,setMapLayers]=useState([])
  const switchToLayer = (layerName) => {
    setSelectedLayer(layerName);
  };
  console.log('rrrrrrrrrr',colors)
  const _onCreate=(e,colors)=>{
    setTotalDistance(0)
    const {layerType,layer}=e
    if(layerType === "polyline"){
      const customPolylineStyle = {
        color: colors, // Customize the color to your desired color
        weight: 3,      // Customize the weight as needed
      };
  
      layer.setStyle(customPolylineStyle);
      const {_leaflet_id}=layer
      let newTotalDistance = 0;
      const latlngs = layer.editing.latlngs[0];
      for (let i = 1; i < latlngs.length; i++) {
        const prevLatLng = latlngs[i - 1];
        const currentLatLng = latlngs[i];
        newTotalDistance += prevLatLng.distanceTo(currentLatLng);
      }
      newTotalDistance = Number(newTotalDistance.toFixed(2));
      setTotalDistance(prevDistance => prevDistance + newTotalDistance);
      setMapLayers(layers=>[
        ...layers,
        {id:_leaflet_id,
        latlngs:layer.editing.latlngs,
        newTotalDistance: newTotalDistance.toFixed(2),
        // style: customPolylineStyle,
        }
      ])
      const polylines = splitCoordinatesByDistance(coordinates, distances);

      console.log("polyyyyyy",polylines);
      polylines.forEach((segment, segmentIndex) => {
        console.log(`Segment ${segmentIndex + 1}:`);
        segment.forEach((coordinate, coordinateIndex) => {
          console.log(`Coordinate ${coordinateIndex + 1}:`);
          console.log(`Latitude: ${coordinate.lat}, Longitude: ${coordinate.lng}`);
        });
      });
    }
  }
  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l, index) =>
          l.id === _leaflet_id ? { ...l, latlngs: { ...editing.latlngs[0] } } : l
        )
      );
    });
  };
  
  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map((_leaflet_id) => {
      setMapLayers (layers => layers.filter((l) => l.id !== _leaflet_id));
    });
    };
    
  console.log(JSON.stringify(maplayers,0,2))
  const handleEdit = () => {
    if (editRef.current) {
      const { edit } = editRef.current.leafletDraw._handlers;
      edit.enable(); // Enable editing mode
    }
  };



  return (
    <>
    <MapContainer center={center} zoom={10} className='h-screen w-full z-10'>
        <FeatureGroup >
          <EditControl ref={editRef}
            position="topleft" onCreated={(e) => _onCreate(e, colors)} onEdited={_onEdited} onDeleted={_onDeleted}
            draw={{
              rectangle:false,
              polygone:false,
              circle:false,
              circlemarker:false,
              marker:false
            }}
          />
      </FeatureGroup>
      <LayersControl position="topleft">
        <LayersControl.BaseLayer checked={selectedLayer === 'OpenStreetMap'} name="OpenStreetMap">
          <TileLayer
             attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
             url={`https://api.mapbox.com/styles/v1/islambenchaiba/cltl8uemj00bd01pj1bf19pia/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}             />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked={selectedLayer === 'Stamen Terrain'} name="Stamen Terrain">
          <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg" />
        </LayersControl.BaseLayer>

      </LayersControl>
      <Control prepend position='topright'>
      </Control>
      {
        active ? 
        dataa.map((feature,index)=>(
          <Polyline key={index} positions={feature.geometry.coordinates} color= {"white"} icon={healthIcon} weight={5}>
            <Popup>{}</Popup>
          </Polyline>
        ))     
        :
        coordinates.map((feature, index) => (
          <Polyline key={index} positions={feature.latlngs[0].map(coord => [coord.lat, coord.lng])} color={"white"} weight={5}>
            <Popup>ID: {feature.id}</Popup>
          </Polyline>
        ))    
      }
      
      {pui.map((p, index) => (
        <Marker eventHandlers={{
          click: () => onOpen(),
        }}
         key={index} position={p.geometry.coordinates} icon={healthIcon}>
        </Marker>
      ))}
    </MapContainer>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-50 ">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <p> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam pulvinar risus non risus hendrerit venenatis.
              Pellentesque sit amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nullam pulvinar risus non risus hendrerit venenatis.
              Pellentesque sit amet hendrerit risus, sed porttitor quam.
            </p>
            <p>
              Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
              dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
              Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
              Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
              proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Action
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    <div class="custom-layer-control">
      <div class="layer-icon" id="openStreetMapIcon" onClick={() =>setSelectedLayer('OpenStreetMap')}>
        <Image width={100} height={100} src="eye.svg" alt="OpenStreetMap Icon"/>
      </div>
      <div class="layer-icon" id="stamenTerrainIcon" onClick={() =>setSelectedLayer('Stamen Terrain')}>
        <Image width={100} height={100} src="fire.svg" alt="Stamen Terrain Icon"/>
      </div>
    </div>

</>
  );
};

export default Map;
