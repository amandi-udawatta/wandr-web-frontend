'use client'

import React, { useState, useRef, useEffect } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from 'antd';
import { Library } from '@googlemaps/js-api-loader';

const libraries: Library[] = ['places'];
const apiKey = 'AIzaSyCc0kuXm4K-GyRHuXAbp7WDO5-kqmwt4Fg'; // Replace with your API key

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: any) => void;
  options?: google.maps.places.AutocompleteOptions;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({ onPlaceSelect, options }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.setOptions(options || {});
    }
  }, [autocomplete, options]);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = async () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.place_id && place.formatted_address && place.geometry) {
        const selectedPlace = {
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: {
            lat: place.geometry.location?.lat(),
            lng: place.geometry.location?.lng(),
          },
        };

        onPlaceSelect(selectedPlace);

        // Update the input value to show the full name of the selected place
        setInputValue(selectedPlace.name);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={options || {}}
      >
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search places"
          style={{ width: '100%' }}
          className='h-12'
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default PlaceAutocomplete;
