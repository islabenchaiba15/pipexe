"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polyline,
  LayersControl,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { EditControl } from "react-leaflet-draw";
import WellContext from "../context/WellContext";
import L from "leaflet";
import DataContext from "@/context/DataContext";
import { axiosInstance } from "@/Api/Index";
const MapComponent = ({ icon, coords, page, pipe, segments }) => {
  const userIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35], // size of the icon
  });

  const WellIcon = L.icon({
    iconUrl: icon,
    iconSize: [35, 35], // size of the icon
  });

  L.Draw.Marker.prototype.options.icon = WellIcon;

  const {
    marker,
    setMarker,
    activeCoordinates,
    setActiveCoordinates,
    ischecked,
    setChecked,
  } = useContext(WellContext);
  const mapRef = useRef(null);
  const center = [31.66096018001669, 6.195720434188843];
  const _onCreate = (e, colors) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "marker") {
      layer.setIcon(userIcon);
      const { _latlng } = layer;
      console.log("layeeeeeeeeer", layer);
      console.log("lllaaaaaaa", _latlng);
      const mark = { lat: _latlng.lat, lng: _latlng.lng };
      console.log("mark", mark);
      setMarker(mark);
    }
  };
  const _onEdited = (e) => {
    const { layers } = e;
    const { _layers } = layers;
    const { _latlng } = _layers;
    const xx = Object.values(_layers)[0]._latlng;
    setMarker(xx);
    console.log("ooooo", xx);
  };

  const _onDeleted = (e) => {
    console.log(e);
    setMarker(null);
  };
  console.log("jsonnnnnn", JSON.stringify(marker, 0, 2));
  const islam = [
    [31.783049527817784, 5.536281317011623],
    [31.782539219684633, 5.64146099789712],
  ];
  const islam1 = [
    [31.782539219684633, 5.64146099789712],
    [31.786048201992983, 5.665312754686333],
  ];
  const islam2 = [
    [31.786048201992983, 5.665312754686333],
    [31.78888616378847, 5.684603354801907],
    [31.784216884487385, 5.7148171032406925],
  ];
  const [selectedLayer, setSelectedLayer] = useState("islam");
  const mapboxAccessToken =
    "pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g";

  const healthIcon = L.icon({
    iconUrl: "../puit.svg",
    iconSize: [35, 35], // size of the icon
  });

  const manifoldIcon = L.icon({
    iconUrl: "../manifold.svg",
    iconSize: [35, 35], // size of the icon
  });

  const junctionIcon = L.icon({
    iconUrl: "../islam.png",
    iconSize: [35, 35], // size of the icon
  });

  const colors = ["white", "black"];
  const [loading, setLoading] = useState(true);

  const [wells, setWells] = useState([]);
  const [manifolds, setManifolds] = useState([]);
  const [junctions, setJunctions] = useState([]);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);

  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await axiosInstance.get("/well/get-wells");
        const dataa = await axiosInstance.get("/manifold/getAll");
        const junction = await axiosInstance.get("/junction/getAll");

        setWells(response.data);
        setManifolds(dataa.data);
        setJunctions(junction.data);
        console.log("raniaaaaaaaaaaaa", response.data);
        console.log("islammmmmmmmmmmvvvvvvv", wells);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchWells();
  }, []);
  useEffect(() => {
    console.log("Updated wells state:", wells);
    console.log("Updated junctions state:", junctions);
   if(page==="pipe"){
    const fromId = pipe.fromDetails._id;
    const fromObject =
      wells.find((well) => well._id === fromId) ||
      manifolds.find((manifold) => manifold._id === fromId);
    junctions.find((junction) => junction._id === fromId);
    if (fromObject) {
      // The fromObject contains the object with the matching ID
      setFrom(fromObject);
      console.log("tooooooooooooooooooooooooooooootoooooo", to);
    } else {
      console.log("Object not found");
    }
    const toId = pipe.toDetails._id;
    const toObject =
      wells.find((well) => well._id === toId) ||
      manifolds.find((manifold) => manifold._id === toId);
    junctions.find((junction) => junction._id === toId);
    if (toObject) {
      setTo(toObject);
      // The fromObject contains the object with the matching ID
      console.log("booooooooooooooobo", to);
    } else {
      console.log("Object not found");
    }
   }
    setLoading(false);
  }, [wells, junctions, manifolds]);

  console.log("frrrrrrrrrrrrrrrrrrrm", from);
  return (
    !loading && (
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={12}
        className="h-full w-full z-10"
      >
        {ischecked && (
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={_onCreate}
              onEdited={_onEdited}
              onDeleted={_onDeleted}
              draw={{
                rectangle: false,
                polygon: false,
                circle: false,
                circlemarker: false,
                polyline: false,
                marker: true,
              }}
            />
          </FeatureGroup>
        )}
        <LayersControl position="topleft">
          <LayersControl.BaseLayer
            checked={selectedLayer === "OpenStreetMap"}
            name="OpenStreetMap"
          >
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/islambenchaiba/cltl8uemj00bd01pj1bf19pia/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            checked={selectedLayer === "Stamen Terrain"}
            name="Stamen Terrain"
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            checked={selectedLayer === "islam"}
            name="islam"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {page === "manifold" && (
          <Marker
            position={[coords.latitude, coords.longitude]}
            icon={WellIcon}
          >
            <Popup>This is a marker</Popup>
          </Marker>
        )}
         {page === "well" && (
          <Marker
            position={[coords.latitude, coords.longitude]}
            icon={WellIcon}
          >
            <Popup>This is a marker</Popup>
          </Marker>
        )}
        {page === "junction" && (
          <Marker
            position={[coords.latitude, coords.longitude]}
            icon={WellIcon}
          >
            <Popup>This is a marker</Popup>
          </Marker>
        )}

        {/* <Polyline junction positions={islam} color={"black"} weight={5}>
        <Popup>{}</Popup>
      </Polyline>
      <Polyline positions={islam1} color={"red"} weight={5}>
        <Popup>{}</Popup>
      </Polyline>
      <Polyline positions={islam2} color={"white"} weight={5}>
        <Popup>{}</Popup>
      </Polyline> */}
        {page === "pipe" &&
          segments.map((pipe, index) => {
            const positions = pipe.coor_id.map((coord) => [
              coord.latitude,
              coord.longitude,
            ]);
            return (
              <Polyline
                key={index}
                positions={positions}
                color={colors[index % colors.length]}
              />
            );
          })}
        {page === "pipe" && from && (
          <>
            <Marker
              position={[
                from.coords?.latitude || 0,
                from.coords?.longitude || 0,
              ]}
              icon={healthIcon}
            ></Marker>
          </>
        )}

        {page === "pipeee" &&
          wells.map((well, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`create-well/${well._id}`),
              }}
              position={[well.coords.latitude, well.coords.longitude]}
              icon={healthIcon}
              key={index}
            >
              {/* <Tooltip
                direction="right"
                offset={[0, 0]}
                opacity={1}
                permanent
                className="custom-tooltip"
              >
                md1
              </Tooltip> */}
            </Marker>
          ))}

        {page === "pipeee" &&
          manifolds.map((manifold, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`manifold/${manifold._id}`),
              }}
              position={[manifold.coords.latitude, manifold.coords.longitude]}
              icon={manifoldIcon}
              key={index}
            ></Marker>
          ))}

        {page === "pipeee" &&
          junctions.map((junction, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`jonction/${junction._id}`),
              }}
              position={[junction.coords.latitude, junction.coords.longitude]}
              icon={junctionIcon}
              key={index}
            ></Marker>
          ))}
      </MapContainer>
    )
  );
};

export default MapComponent;
