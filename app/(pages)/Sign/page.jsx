// page.js
"use client";

import Map, { NavigationControl, GeolocateControl, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import classes from "../../page.module.css";
import { data } from "@/constants/data";

export default function Home() {
	const mapboxToken = "pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g";

	return (
		<main className={classes.mainStyle}>
			<Map
				mapboxAccessToken={mapboxToken}
				mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '500px' }} // Use an object for inline styles
        initialViewState={{ latitude: 31.6283249956319, longitude: 6.12366995329203, zoom: 10 }}
				maxZoom={20}
        pitch= {60} // pitch in degrees
        bearing= {-60}
				minZoom={3}
			>
				<GeolocateControl position="top-left" />
				<NavigationControl position="top-left" />
        <Source type="geojson" data={data}>
          {/* Add a new Layer component to render the polylines */}
          <Layer
            id="polyline-layer"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "red",
              "line-width": 4,
            }}
          />
        </Source>
			</Map>
		</main>
	);
}


// pk.eyJ1IjoiaXNsYW1iZW5jaGFpYmEiLCJhIjoiY2x0bDhlcjVlMGplMDJqbXl4ZzFvbGllYyJ9.PYMskRvnsmAOm7N97ndC4g