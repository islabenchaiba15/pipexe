"use client";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayersControl,
  FeatureGroup,
  Tooltip,
  LayerCanvas,
} from "react-leaflet";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EditControl } from "react-leaflet-draw";
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L, { Icon } from "leaflet";
import { puits } from "../constants/achraf";
import Image from "next/image";
import Control from "react-leaflet-custom-control";
import SegmentModal from "./SegmentModal";
import CoordContext from "../context/CoordContext";
import { axiosInstance } from "@/Api/Index";
import { useRouter } from "next/navigation";
import { data } from "@/constants/data";
import DataContext from "@/context/DataContext";
import { puitsHorsServices } from "@/constants/puitsHorsServices";
import { gaspipes } from "@/constants/gaspipes";
import { waterpipes } from "@/constants/waterpipes";
import { manifoldes } from "@/constants/manifolds";
import { colectorsanes } from "@/constants/collectors";
import { collectsanes } from "@/constants/collects";
import { eruptifsanes } from "@/constants/eruptifs";
import { gasliftanes } from "@/constants/gasLift";
import { injectiongasanes } from "@/constants/injectionGas";
import { injectionwateranes } from "@/constants/injectionWater";
import { jonctionsanes } from "@/constants/jonctions";
import { manifoldshorsserviceanes } from "@/constants/manifoldsHorsService";

export function splitCoordinatesByDistance(coordinates, distances) {
  const result = [];
  let totalDistance = 0;
  let currentIndex = 0;
  const totalDistanceOfCoordinates = parseFloat(
    coordinates[0].newTotalDistance
  );
  let startCoordinate = coordinates[0].latlngs[0][0];

  for (const distance of distances) {
    const polyline = [startCoordinate]; // Start coordinate of the segment
    const targetDistance = totalDistance + distance;

    while (currentIndex < coordinates[0].latlngs[0].length) {
      const currentCoordinate = coordinates[0].latlngs[0][currentIndex];
      const nextCoordinate =
        currentIndex === coordinates[0].latlngs[0].length - 1
          ? null
          : coordinates[0].latlngs[0][currentIndex + 1];

      if (nextCoordinate) {
        const distanceBetweenCoordinates = getDistanceBetweenCoordinates(
          currentCoordinate,
          nextCoordinate
        );

        if (totalDistance + distanceBetweenCoordinates <= targetDistance) {
          totalDistance += distanceBetweenCoordinates;
          currentIndex++;
        } else {
          const ratio =
            (targetDistance - totalDistance) / distanceBetweenCoordinates;
          const interpolatedCoordinate = {
            lat:
              currentCoordinate.lat +
              ratio * (nextCoordinate.lat - currentCoordinate.lat),
            lng:
              currentCoordinate.lng +
              ratio * (nextCoordinate.lng - currentCoordinate.lng),
          };
          polyline.push(interpolatedCoordinate); // End coordinate of the segment
          startCoordinate = interpolatedCoordinate; // Update the start coordinate for the next segment
          break;
        }
      } else {
        polyline.push(currentCoordinate); // End coordinate of the segment (last coordinate)
        break;
      }
    }

    result.push(polyline);
  }

  // Add the remaining coordinates as the last polyline
  if (totalDistance < totalDistanceOfCoordinates) {
    const remainingPolyline = [
      startCoordinate,
      ...coordinates[0].latlngs[0].slice(currentIndex + 1),
    ];
    result.push(remainingPolyline);
  }

  return result;
}

function getDistanceBetweenCoordinates(coord1, coord2) {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (coord1.lat * Math.PI) / 180;
  const phi2 = (coord2.lat * Math.PI) / 180;
  const deltaPhi = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLambda = ((coord2.lng - coord1.lng) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

const Map = ({
  showOpenStreetMap,
  activeLayer,
  setTotalDistance,
  activeButton,
  selectedNetworks,
  selectedWells,
  selectedLines,
  selectedLineSizes,
}) => {
  const router = useRouter();
  const coordinates = [
    {
      id: 544,
      latlngs: [
        [
          {
            lat: 31.594913125427418,
            lng: 5.188155478031465,
          },
          {
            lat: 31.62181309470655,
            lng: 5.368048071079792,
          },
          {
            lat: 31.66039512307388,
            lng: 5.499877757588468,
          },
          {
            lat: 31.631167783684706,
            lng: 5.608362603777933,
          },
          {
            lat: 31.560984698031774,
            lng: 5.747058419792284,
          },
        ],
      ],
      newTotalDistance: "47766.20",
    },
  ];
  const distances = [];
  const [edited, setEdited] = useState(false);
  const [active, setActive] = useState(false);

  const [editedLayer, setEditedLayer] = useState(false);

  const center = [31.68121343655558, 6.141072936328754];
  const editRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const Erruptif = L.icon({
    iconUrl: "../Erruptif.svg",
    iconSize: [45, 45], // size of the icon
  });
  const erruptifInspection = L.icon({
    iconUrl: "../erruptifInspection.svg",
    iconSize: [45, 45], // size of the icon
  });
  const jonctionanes = L.icon({
    iconUrl: "../jonctionanes.svg",
    iconSize: [15, 15], // size of the icon
  });
  const gasLift = L.icon({
    iconUrl: "../gasLift.svg",
    iconSize: [45, 45], // size of the icon
  });
  const gasLiftInspect = L.icon({
    iconUrl: "../gasLiftInspect.svg",
    iconSize: [45, 45], // size of the icon
  });
  const injectorGas = L.icon({
    iconUrl: "../injectorGas.svg",
    iconSize: [30, 30], // size of the icon
  });
  const injectorGasInspection = L.icon({
    iconUrl: "../injectorGasInspection.svg",
    iconSize: [30, 30], // size of the icon
  });
  const injectorWater = L.icon({
    iconUrl: "../puit.svg",
    iconSize: [30, 30], // size of the icon
  });

  const injectorWaterInspection = L.icon({
    iconUrl: "../puit.svg",
    iconSize: [30, 30], // size of the icon
  });
  const manifold = L.icon({
    iconUrl: "../puit.svg",
    iconSize: [45, 45], // size of the icon
  });
  const manifoldHorsService = L.icon({
    iconUrl: "../manifoldHorsService.svg",
    iconSize: [45, 45], // size of the icon
  });
  const manifoldIOnspection = L.icon({
    iconUrl: "../manifoldIOnspection.svg",
    iconSize: [45, 45], // size of the icon
  });
  const puitHorsService = L.icon({
    iconUrl: "../puitHorsService.svg",
    iconSize: [30, 30], // size of the icon
  });
  const puitHorsServiceInsp = L.icon({
    iconUrl: "../puitHorsServiceInsp.svg",
    iconSize: [30, 30], // size of the icon
  });
  const station = L.icon({
    iconUrl: "../station.svg",
    iconSize: [45, 45], // size of the icon
  });
  const stationHorsService = L.icon({
    iconUrl: "../stationHorsService.svg",
    iconSize: [45, 45], // size of the icon
  });
  const stationInspection = L.icon({
    iconUrl: "../stationInspection.svg",
    iconSize: [45, 45], // size of the icon
  });
  const healthIcon = L.icon({
    iconUrl: "../puit.svg",
    iconSize: [45, 45], // size of the icon
  });

  const manifoldIcon = L.icon({
    iconUrl: "../manifold.svg",
    iconSize: [35, 35], // size of the icon
  });

  const junctionIcon = L.icon({
    iconUrl: "../islam.png",
    iconSize: [35, 35], // size of the icon
  });
  const [selectedLayer, setSelectedLayer] = useState("OpenStreetMap");
  const mapboxAccessToken =
    "pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g";
  const colors = ["white", "red", "white", "red"];
  const { maplayers, polylines, setMapLayers, setPolylines } =
    useContext(CoordContext);

  const handleLayerChange = (layer) => {
    setSelectedLayer(layer);
  };
  const switchToLayer = (layerName) => {
    setSelectedLayer(layerName);
  };
  console.log("rrrrrrrrrr", colors);
  const _onCreate = (e, colors) => {
    setTotalDistance(0);
    const { layerType, layer } = e;
    if (layerType === "polyline") {
      const customPolylineStyle = {
        color: colors, // Customize the color to your desired color
        weight: 3, // Customize the weight as needed
      };

      layer.setStyle(customPolylineStyle);
      const { _leaflet_id } = layer;
      let newTotalDistance = 0;
      const latlngs = layer.editing.latlngs[0];
      for (let i = 1; i < latlngs.length; i++) {
        const prevLatLng = latlngs[i - 1];
        const currentLatLng = latlngs[i];
        newTotalDistance += prevLatLng.distanceTo(currentLatLng);
      }
      newTotalDistance = Math.trunc(newTotalDistance);
      setTotalDistance((prevDistance) => prevDistance + newTotalDistance);
      setMapLayers((layers) => [
        ...layers,
        {
          id: _leaflet_id,
          latlngs: layer.editing.latlngs,
          newTotalDistance: newTotalDistance,
          // style: customPolylineStyle,
        },
      ]);
      setActive(!active);
    }
  };
  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { layerType, _layers },
    } = e;
    console.log("poooooooooooooooooo", maplayers);

    const editedLayers = Object.values(_layers).map(
      ({ _leaflet_id, editing }) => {
        return {
          id: _leaflet_id,
          latlngs: editing.latlngs[0],
        };
      }
    );

    setEditedLayer(editedLayers);
    setEdited(!edited);

    console.log("ediiiiiiiiiiiiiiiiiiiiited", editedLayers);

    console.log("mmmmmmmm", maplayers);
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    const deletedLayerIds = Object.values(_layers).map(
      ({ _leaflet_id }) => _leaflet_id
    );
    console.log("ooonnnnnnnnnnnnn", deletedLayerIds);
    setMapLayers((layers) =>
      layers.filter((layer) => !deletedLayerIds.includes(layer.id))
    );
  };

  console.log(JSON.stringify(maplayers, 0, 2));

  const islam = [
    [31.944087207818132, 6.116638183593751],
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

  const [loading, setLoading] = useState(true); // Add loading state
  const {
    wells,
    setWells,
    manifolds,
    setManifolds,
    junctions,
    setJunctions,
    pipes,
    setPipes,
  } = useContext(DataContext);
  const [oilPipes, setOilPipes] = useState({});
  const [waterPipes, setWaterPipes] = useState({}); // Add loading state
  const [gasPipes, setGasPipes] = useState({});
  const [collectOilPipes, setCollectOilPipes] = useState([]);
  const [collectorOilPipes, setCollectorOilPipes] = useState([]);

  // Add loading state
  // Add loading state
  const categorizedPipes = {
    water: [],
    oil: [],
    gas: [],
    collectOil: [],
    collectorOil: [],
  };
  useEffect(() => {
    const fetchWells = async () => {
      try {
        const response = await axiosInstance.get("/well/get-wells");
        const dataa = await axiosInstance.get("/manifold/getAll");
        const junction = await axiosInstance.get("/junction/getAll");
        const pipes = await axiosInstance.get("/pipe/getAll");

        pipes.data.map((pipe) => {
          console.log("Processing pipe:", pipe);
          switch (pipe.nature.toLowerCase()) {
            case "water":
              categorizedPipes.water.push(pipe);
              break;
            case "oil":
              if (pipe.type.toLowerCase() === "collect") {
                categorizedPipes.collectOil.push(pipe);
              } else {
                categorizedPipes.oil.push(pipe);
              }
              break;
            case "gas":
              categorizedPipes.gas.push(pipe);
              break;
            default:
              console.warn(`Unknown pipe type: ${pipe.nature}`);
          }
          return null; // map requires a return value, but we don't use it here
        });

        // Set the categorized pipes to state
        setWaterPipes(categorizedPipes.water);
        setOilPipes(categorizedPipes.oil);
        setGasPipes(categorizedPipes.gas);
        setCollectOilPipes(categorizedPipes.collectOil);
        setCollectorOilPipes(categorizedPipes.collectorOil);

        // Set the categorized pipes to state
        setPipes(pipes.data);
        setWells(response.data);
        setManifolds(dataa.data);
        setJunctions(junction.data);
        console.log("raniaaaaaaaaaaaa", response.data);
        console.log("islammmmmmmmmmmvvvvvvv", wells);
        setLoading(false);
        console.log(loading, "looooooooooooooding");
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchWells();
  }, []);
  useEffect(() => {
    console.log("Updated pipppes state:", pipes);
  }, [wells, junctions, pipes]);

  const polylineOptionscollect = {
    color: "black",
    weight: 3,
    // [dashLength, gapLength]
  };

  const polylineOptionsgas = {
    color: "lime",
    weight: 2,
    // [dashLength, gapLength]
  };

  const polylineOptionswater = {
    color: "blue",
    weight: 2,
    // [dashLength, gapLength]
  };

  const polylineOptionscollector = {
    color: "black",
    weight: 3,
    dashArray: "5 5",
    // [dashLength, gapLength]
  };
  const polylineOptions = {
    color: "red",
    weight: 3,
    dashArray: "10 5",
    // [dashLength, gapLength]
  };

  return (
    <>
      <MapContainer center={center} zoom={10} className="w-full h-screen z-10 ">
        <FeatureGroup>
          <EditControl
            position="topleft"
            onCreated={(e) => _onCreate(e, colors)}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              polygone: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
          />
        </FeatureGroup>
        <LayersControl position="topleft">
          <LayersControl.BaseLayer
            checked={activeLayer === "OpenStreetMap"}
            name="OpenStreetMap"
          >
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/islambenchaiba/cltl8uemj00bd01pj1bf19pia/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            checked={activeLayer === "Stamen Terrain"}
            name="Stamen Terrain"
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer
            checked={activeLayer === "native"}
            name="native"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Control prepend position="topright"></Control>
        {active && (
          <Polyline
            positions={maplayers[0].latlngs[0].map((coord) => [
              coord.lat,
              coord.lng,
            ])}
            color={"black"}
            icon={healthIcon}
            weight={5}
          ></Polyline>
        )}
        {!loading &&
          waterPipes.map((pipe, index) => (
            <Polyline
              key={index}
              eventHandlers={{
                click: () => router.push(`pipe/${pipe._id}`),
              }}
              positions={pipe.coords}
              pathOptions={polylineOptionswater}
            ></Polyline>
          ))}

        {!loading &&
          gasPipes.map((pipe, index) => (
            <Polyline
              key={index}
              eventHandlers={{
                click: () => router.push(`pipe/${pipe._id}`),
              }}
              positions={pipe.coords}
              pathOptions={polylineOptionsgas}
            ></Polyline>
          ))}

        {!loading &&
          collectOilPipes.map((pipe, index) => (
            <Polyline
              key={index}
              eventHandlers={{
                click: () => router.push(`pipe/${pipe._id}`),
              }}
              positions={pipe.coords}
              pathOptions={polylineOptionscollect}
            ></Polyline>
          ))}

        {!loading &&
          collectorOilPipes.map((pipe, index) => (
            <Polyline
              key={index}
              eventHandlers={{
                click: () => router.push(`pipe/${pipe._id}`),
              }}
              positions={pipe.coords}
              pathOptions={polylineOptionscollector}
            ></Polyline>
          ))}

        {manifoldes.features.map((feature, index) => (
          <Marker
            position={feature.geometry.coordinates}
            icon={healthIcon}
            key={index}
          >
            <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
            <Popup>{feature.properties.name}</Popup>
          </Marker>
        ))}
        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaanessssssssssssssssssssssssssssssssssssssssssss */}
        {selectedLines.includes("Collector") &&
          colectorsanes.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates}
              pathOptions={polylineOptionscollector}
            >
              <Popup>{feature.properties.Name}</Popup>
            </Polyline>
          ))}
        {selectedNetworks.includes("Gas") &&
          gaspipes.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates}
              pathOptions={polylineOptionsgas}
            >
              <Popup>{feature.properties.Name}</Popup>
            </Polyline>
          ))}

        {selectedNetworks.includes("Water") &&
          waterpipes.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates}
              pathOptions={polylineOptionswater}
            >
              <Popup>{feature.properties.Name}</Popup>
            </Polyline>
          ))}

        {selectedLines.includes("Collect") &&
          collectsanes.features.map((feature, index) => (
            <Polyline
              key={index}
              positions={feature.geometry.coordinates}
              pathOptions={polylineOptionscollect}
            >
              <Popup>{feature.properties.Name}</Popup>
            </Polyline>
          ))}

        {selectedWells.includes("Eruptive") &&
          eruptifsanes.features.map((feature, index) => (
            <Marker
              position={feature.geometry.coordinates}
              icon={Erruptif}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="top"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
              <Popup>{feature.properties.Name}</Popup>
            </Marker>
          ))}

        {selectedWells.includes("Gas Lift") &&
          gasliftanes.features.map((feature, index) => (
            <Marker
              position={feature.geometry.coordinates}
              icon={gasLift}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
              <Popup>{feature.properties.Name}</Popup>
            </Marker>
          ))}
        {selectedWells.includes("Water Injector") &&
          injectionwateranes.features.map((feature, index) => (
            <Marker
              position={feature.geometry.coordinates}
              icon={injectorWater}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
              <Popup>{feature.properties.Name}</Popup>
            </Marker>
          ))}
        {selectedWells.includes("Gas Injector") &&
          injectiongasanes.features.map((feature, index) => (
            <Marker
              position={feature.geometry.coordinates}
              icon={injectorGas}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
              <Popup>{feature.properties.Name}</Popup>
            </Marker>
          ))}
        {jonctionsanes.features.map((feature, index) => (
          <Marker
            position={feature.geometry.coordinates}
            icon={jonctionanes}
            key={index}
          >
            <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.name}
              </Tooltip>
            <Popup>{feature.properties.name}</Popup>
          </Marker>
        ))}
        {manifoldshorsserviceanes.features.map((feature, index) => (
          <Marker
            position={feature.geometry.coordinates}
            icon={manifoldHorsService}
            key={index}
          >
            <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.name}
              </Tooltip>
            <Popup>{feature.properties.Name}</Popup>
          </Marker>
        ))}

        {puitsHorsServices.features.map((feature, index) => (
          <Marker
            position={feature.geometry.coordinates}
            icon={puitHorsService}
            key={index}
          >
            <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
            <Popup>{feature.properties.name}</Popup>
          </Marker>
        ))}

        {puitsHorsServices.features.map((feature, index) => (
          <Marker
            position={feature.geometry.coordinates}
            icon={puitHorsService}
            key={index}
          >
            <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {feature.properties.Name}
              </Tooltip>
            <Popup>{feature.properties.name}</Popup>
          </Marker>
        ))}
        {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanessssssssssssssssssssssssssssssssssssssss */}

        {/* {coordinates.map((feature, index) => (
          <Polyline
            key={index}
            positions={feature.latlngs[0].map((coord) => [
              coord.lat,
              coord.lng,
            ])}
            pathOptions={polylineOptions}
          >
            <Popup>ID: {feature.id}</Popup>
          </Polyline>
        ))} */}
        {!loading &&
          wells.map((well, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`create-well/${well._id}`),
              }}
              position={[well.coords.latitude, well.coords.longitude]}
              icon={healthIcon}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {well.name}
              </Tooltip>
            </Marker>
          ))}
        {!loading &&
          manifolds.map((manifold, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`manifold/${manifold._id}`),
              }}
              position={[manifold.coords.latitude, manifold.coords.longitude]}
              icon={manifoldIcon}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {manifold.name}
              </Tooltip>
            </Marker>
          ))}

        {!loading &&
          junctions.map((junction, index) => (
            <Marker
              eventHandlers={{
                click: () => router.push(`jonction/${junction._id}`),
              }}
              position={[junction.coords.latitude, junction.coords.longitude]}
              icon={junctionIcon}
              key={index}
            >
              <Tooltip
                offset={[0, 0]}
                opacity={1}
                permanent
                direction="bottom"
                className="my-labels"
              >
                {junction.name}
              </Tooltip>
            </Marker>
          ))}

        {/* {polys.map((segment, index) => (
        <Polyline
          key={index}
          positions={segment}
          color={colors[index % colors.length]}
        >
          <Popup>
            <SegmentModal/>
          </Popup>
          </Polyline>

      ))} */}
      </MapContainer>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="z-50 ">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
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
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
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
