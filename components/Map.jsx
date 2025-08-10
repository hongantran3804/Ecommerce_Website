import React, { useEffect, useRef } from "react";
import fetch from "node-fetch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

async function getRouteOSRM(lat1, lon1, lat2, lon2) {
  const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&geometries=geojson`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error("Error fetching route from OSRM:", res.statusText);
    return null;
  }

  const data = await res.json();

  if (data.routes.length === 0) return null;
  const route = data.routes[0];
  const routeCoords = route.geometry.coordinates.map((coord) => [
    coord[1],
    coord[0],
  ]);

  return {
    routeCoords,
    duration: route.duration,
    distance: route.distance,
  };
}
const Map = ({ customer, ups, customerAddress, upsAddress }) => {
  const customIcon = L.icon({
    iconUrl: process.env.NEXT_PUBLIC_DOMAIN_ICON + "/location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  const mapRef = useRef(null);
  const routeLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (!customer?.[0] || !customer?.[1] || !ups?.[0] || !ups?.[1]) {
      console.error("Customer or UPS coordinates are not provided");
      return;
    }

    async function updateRoute() {
      try {
        const wholeAddress = `${customerAddress?.streetAddress}, ${customerAddress?.city}, ${customerAddress?.state} ${customerAddress?.zipcode}`;
        const { routeCoords, duration, distance } = await getRouteOSRM(
          customer[0],
          customer[1],
          ups[0],
          ups[1]
        );
        L.marker([customer[0], customer[1]], {
          icon: customIcon,
        })
          .addTo(mapRef.current)
          .bindTooltip(wholeAddress, { permanent: true, direction: "top" });
        L.marker([ups[0], ups[1]], { icon: customIcon })
          .addTo(mapRef.current)
          .bindTooltip(upsAddress, { permanent: true, direction: "top" });

        if (!routeCoords) return;

        if (routeLayerRef.current) {
          routeLayerRef.current.remove();
        }

        routeLayerRef.current = L.polyline(routeCoords, {
          color: "blue",
          weight: 5,
        }).addTo(mapRef.current);

        const bounds = L.latLngBounds(routeCoords);
        mapRef.current.fitBounds(bounds.pad(0.5));

        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        const durationText = `${minutes} min ${seconds} sec`;
        let miles = distance / 1609.344;
        miles = miles.toFixed(2) + " miles";
        routeLayerRef.current
          .bindPopup(
            `Distance: ${miles}<br>Estimate time arrival: ${durationText}`
          )
          .openPopup();
      } catch (error) {
        console.error("Failed to update route:", error);
      }
    }

    updateRoute();

    return () => {
      if (routeLayerRef.current) {
        routeLayerRef.current.remove();
        routeLayerRef.current = null;
      }
    };
  }, [customer, ups, customerAddress, upsAddress]);

  return <div id="map" className="h-full w-full z-0" />;
};

export default Map;
