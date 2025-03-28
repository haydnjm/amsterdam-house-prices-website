"use client";

import { ListingWithCoords } from "@/maps";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { mapStyles } from "./mapStyles";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 52.3661885,
  lng: 4.8956182,
};

function CustomMarker({
  marker,
}: {
  marker: ListingWithCoords & { showing: boolean };
}) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Marker
      key={marker.link}
      position={marker.coords}
      onClick={() => setShowInfo(true)}
      icon={marker.showing ? "/pin_small.png" : "/pin_small_grey.png"}
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

function TodaysListingsMap({
  markers,
}: {
  markers: Array<ListingWithCoords & { showing: boolean }>;
}) {
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
      zoom={12}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map((marker) => (
        <CustomMarker key={marker.link} marker={marker} />
      ))}
    </GoogleMap>
  ) : (
    <>Google maps is not loaded...</>
  );
}

export default React.memo(TodaysListingsMap);
