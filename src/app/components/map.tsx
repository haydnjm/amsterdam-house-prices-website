"use client";

import {
  GoogleMap,
  InfoWindow,
  InfoWindowF,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { ListingWithCoords } from "../../maps";
import { mapStyles } from "./mapStyles";
import React, { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 52.3661885,
  lng: 4.8956182,
};

function CustomMarker({ marker }: { marker: ListingWithCoords }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Marker
      key={marker.link}
      position={marker.coords}
      onClick={() => setShowInfo(true)}
      icon={"/pin_20.png"}
    >
      {showInfo && (
        <InfoWindow
          position={marker.coords}
          onCloseClick={() => setShowInfo(false)}
        >
          <a target="_blank" href={marker.link} className="underline">
            Go to listing
          </a>
        </InfoWindow>
      )}
    </Marker>
  );
}

function TodaysListingsMap({ markers }: { markers: ListingWithCoords[] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={{
        styles: mapStyles,
      }}
      center={center}
      zoom={13}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map((marker) => (
        <CustomMarker key={marker.link} marker={marker} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(TodaysListingsMap);
