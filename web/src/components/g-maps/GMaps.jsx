import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

function Map({ center, zoom, markers }) {
  const ref = useRef();

  useEffect(() => {
   const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
    markers.forEach((marker) => new window.google.maps.Marker({
      position: center,
      map,
      title: marker.title,
    })) 
  }, [center, zoom, markers]);

  return <div ref={ref} id="map" style={{ height: "580px"}}/>;
}

function GMaps({ markers, center, zoom }) {
  return (
    <Wrapper apiKey={GOOGLE_API_KEY}>
      <Map center={center} zoom={zoom} markers={markers} />
    </Wrapper>
  );
}

export default GMaps;
