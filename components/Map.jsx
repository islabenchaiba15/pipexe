'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl,FeatureGroup} from 'react-leaflet';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {EditControl} from 'react-leaflet-draw'
import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {data} from '@/constants/data';
import L, { Icon } from 'leaflet';
import { puits } from '@/constants/achraf';
import Pop from './Modal';
const Map = ({ locations }) => {
  const center = [31.68121343655558,6.141072936328754]; 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const healthIcon =L.icon({
    iconUrl: "islam.png",
    iconSize: [35, 35], // size of the icon
  });
  const pui = puits.features
  const dataa=data.features
  const coordinates = data.features[0].geometry.coordinates;
  console.log(data.features[0])
  const [selectedLayer, setSelectedLayer] = useState('OpenStreetMap');
  const mapboxAccessToken="pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g"
  const handleLayerChange = (event) => {
    setSelectedLayer(event.name);
  };
  const [maplayers,setMapLayers]=useState([])

  const switchToLayer = (layerName) => {
    setSelectedLayer(layerName);
  };
  const _onCreate=(e)=>{
    console.log(e)
    const {layerType,layer}=e
    if(layerType === "polyline"){
      // const customPolylineStyle = {
      //   color: 'black', // Customize the color to your desired color
      //   weight: 3,      // Customize the weight as needed
      // };
  
      // Set the custom style for the newly drawn polyline
      layer.setStyle(customPolylineStyle);
      const {_leaflet_id}=layer
      setMapLayers(layers=>[
        ...layers,
        {id:_leaflet_id,
        latlngs:layer.editing.latlngs,
        // style: customPolylineStyle,
        }
      ])
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
  return (
    <>
    <MapContainer center={center} zoom={10} className='h-screen w-full z-10'>
      <FeatureGroup>
        <EditControl position="topright" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted}
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
      {dataa.map((feature,index)=>(
        <Polyline key={index} positions={feature.geometry.coordinates} color= {"white"} icon={healthIcon} weight={5}>
          <Popup>{}</Popup>
        </Polyline>
      ))}
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
</>
  );
};

export default Map;
