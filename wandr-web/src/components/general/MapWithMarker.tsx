import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const apiKey = 'AIzaSyCc0kuXm4K-GyRHuXAbp7WDO5-kqmwt4Fg';

const MapWithDraggableMarker = ({ onPlaceSelected }: { onPlaceSelected: (data: any) => void }) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: 6.9271, lng: 79.8612 }); // Default position (Colombo, Sri Lanka)

  const handleMarkerDragEnd = (event:any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });

    // Geocode the lat/lng to get the address (optional)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey} `)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          onPlaceSelected({ address, lat, lng });
        }
      });
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={markerPosition}
        zoom={15}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithDraggableMarker;
