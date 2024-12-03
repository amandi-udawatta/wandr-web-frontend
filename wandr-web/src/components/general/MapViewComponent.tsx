import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface MapComponentProps {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Ensure it defaults to an empty string if undefined
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }}
      zoom={15}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </GoogleMap>
  );
};

export default MapComponent;
