import React, { useEffect, useRef } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { capacities } from "../../data";
import { Link } from "react-router-dom";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || "";

function Map({ center, zoom, markers }) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    markers?.forEach((marker) => {
      const capacity = capacities.filter(
        (cap) => cap.value === marker.capacity[0]
      );
      const capacityToShow = capacity[0]?.label;
      const mapMarker = new window.google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        id: marker.id,
        destination: marker.destination,
        animation: window.google.maps.Animation.DROP,
      });
      const contentString =
        '<div>' +
        `<h4 class="text-center">${marker.title}</h4>` +
        `<p><b>Destination:</b><br>${marker.destination}</p>` +
        `<p><b>Package size:</b><br>${capacityToShow}</p>` +
        `<a href="/offers/${marker.id}">` +
        "Go to the offer details</a>" +
        "</div>";
      addInfoWindow(mapMarker, contentString);
    });

    function addInfoWindow(marker, message) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: message,
        maxWidth: 200,
      });

      window.google.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
      });
    }
  }, [center, zoom, markers]);

  return <div ref={ref} id="map" style={{ height: "580px" }} />;
}

function GMaps({ markers, center, zoom }) {
  return (
    <Wrapper apiKey={GOOGLE_API_KEY}>
      <Map center={center} zoom={zoom} markers={markers} />
    </Wrapper>
  );
}

export default GMaps;
