'use client'

import React, { useState, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { Library } from '@googlemaps/js-api-loader';

const libraries: Library[] = ['places'];
const apiKey = 'AIzaSyCc0kuXm4K-GyRHuXAbp7WDO5-kqmwt4Fg'; // Replace with your API key

const PlaceAutocomplete = ({ onPlaceSelect }: { onPlaceSelect: (place: any) => void }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = async () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.place_id && place.formatted_address && place.geometry) {
        onPlaceSelect({
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: {
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location?.lng(),
          },
        });

        console.log(place);

      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
        <Autocomplete 
            onLoad={onLoad} 
            onPlaceChanged={onPlaceChanged}
            options={{
                types: ['tourist_attraction'],
                componentRestrictions: { country: 'LK' },
            }}
        >
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search tourist attractions in Sri Lanka"
          style={{ width: '100%' }}
          className='h-12'
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default PlaceAutocomplete;
