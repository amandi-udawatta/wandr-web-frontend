'use client'

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const center = {
  lat: 7.8731, // Default center position (Sri Lanka)
  lng: 80.7718
};

const GoogleMapsAutocomplete = ({ onPlaceSelected }: { onPlaceSelected: (place: any) => void }) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(center);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    // console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address; // Get the formatted address
        setPosition({ lat, lng });
        map.setCenter({ lat, lng });
        map.setZoom(15);
        onPlaceSelected({ lat, lng, address });
      }
    });
  };

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setPosition({ lat, lng });

    // Geocode the lat and lng to get the address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const address = results[0].formatted_address;
        onPlaceSelected({ lat, lng, address });
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={position}
        zoom={10}
        onLoad={map => setMap(map)}
      >
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={() => { }}
          options={{
            componentRestrictions: { country: 'LK' },
          } }
        >
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </Autocomplete>
        {position.lat && position.lng && (
          <Marker
            position={position}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsAutocomplete;
