'use client'
import React, { useContext, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, Polyline } from 'react-leaflet';
import "leaflet-defaulticon-compatibility";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";import { EditControl } from 'react-leaflet-draw';
import WellContext from '../context/WellContext';

const MapComponent = () => {
    const {
    marker,
    setMarker,
    activeCoordinates,
    setActiveCoordinates,
    ischecked,
    setChecked } = useContext(WellContext);
    const mapRef = useRef(null);
    const center = [31.782539219684633,5.64146099789712]; 
    const _onCreate=(e,colors)=>{
      console.log(e)
      const {layerType,layer}=e
      if(layerType === "marker"){
        const {_latlng}=layer
        console.log('layeeeeeeeeer',layer)
        console.log('lllaaaaaaa',_latlng)
        const mark = { lat: _latlng.lat, lng: _latlng.lng }
        console.log('mark',mark)
        setMarker(mark);
      }
    }
    const _onEdited = (e) => {
      const { layers } = e;
      const {_layers} =layers
      const {_latlng}=_layers
      const xx= Object.values(_layers)[0]._latlng
      setMarker(xx)
      console.log('ooooo',xx)
    };
    
    const _onDeleted = (e) => {
      console.log(e)
      setMarker(null)
      };
      console.log('jsonnnnnn',JSON.stringify(marker,0,2))
      const islam=[
        [31.783049527817784, 5.536281317011623],
        [31.782539219684633, 5.64146099789712],
      ]
      const islam1=[
        [31.782539219684633,5.64146099789712],
        [31.786048201992983,  5.665312754686333],
      ]
      const islam2=[
        [31.786048201992983,  5.665312754686333],
        [31.78888616378847, 5.684603354801907],
        [31.784216884487385, 5.7148171032406925]
      ]
      
      return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={10}
      className='h-full w-full z-10'
    >
    {ischecked &&  <FeatureGroup >
          <EditControl 
            position="topright" onCreated={_onCreate} onEdited={_onEdited} onDeleted={_onDeleted}
            draw={{
              rectangle:false,
              polygon:false,
              circle:false,
              circlemarker:false,
              polyline:false,
              marker:true
            }}
          />
        </FeatureGroup> }
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>This is a marker</Popup>
      </Marker>
      <Polyline positions={islam} color= {"black"}  weight={5}>
            <Popup>{}</Popup>
        </Polyline>
        <Polyline  positions={islam1} color= {"red"}  weight={5}>
            <Popup>{}</Popup>
        </Polyline>
        <Polyline  positions={islam2} color= {"white"}  weight={5}>
            <Popup>{}</Popup>
        </Polyline>
    </MapContainer>
  );
};

export default MapComponent;