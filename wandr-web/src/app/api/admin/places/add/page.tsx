'use client'

import React, { useState } from 'react';
import {Col, message, Row } from 'antd';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PlaceAutocomplete from '@/components/admin/PlaceAutoComplete';
import AdminSidebar from '@/components/admin/AdminSideBar';
import AdminHeader from '@/components/admin/AdminHeader';
import { placeValidationSchema } from '@/validations/placeValidationSchema';
import Button from '@/components/general/Button';

const libraries: ('places')[] = ['places'];

interface PlaceFormInputs {
  name: string;
  address: string;
  description: string;
  lat: number;
  lng: number;
  image: string;
  categories: string[];
  activities: string[];
}

const PlacesPage = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<PlaceFormInputs>({
    resolver: yupResolver(placeValidationSchema),
  });

  const [isFormEnabled, setIsFormEnabled] = useState(false);

  const handlePlaceSelect = async (place: any) => {
    const placeId = place.place_id;
    // Send the placeId to the backend to fetch additional data
    fetch(`/api/places/details/${placeId}`)
      .then(response => response.json())
      .then(data => {
        setSelectedPlace(data);
        setValue('name', data.name);
        setValue('address', data.address);
        setValue('description', data.description);
        setValue('lat', data.location.lat);
        setValue('lng', data.location.lng);
        setValue('image', data.image);
        setValue('categories', data.categories);
        setValue('activities', data.activities);
        setIsFormEnabled(true);
      })
      .catch(error => message.error('Error fetching place details'));
  };

  const onSubmit: SubmitHandler<PlaceFormInputs> = async (data) => {
    try {
      const response = await fetch('/api/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedPlace,
          name: data.name,
          address: data.address,
          description: data.description,
        }),
      });

      if (response.ok) {
        message.success('Place saved successfully');
        setSelectedPlace(null);
        reset();
        setIsFormEnabled(false);
      } else {
        throw new Error('Error saving place');
      }
    } catch (error) {
      message.error('Error saving place');
    }
  };

  const handleCancel = () => {
    setSelectedPlace(null);
    reset();
    setIsFormEnabled(false);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Places Management'} />
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Places Management - Add New'} />
        <div className="flex-1 overflow-y-auto p-8">
          
          <Row className='m-5'>
            <Col span={24}>
              <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
            </Col>
          </Row>
          <Row className='m-5'>
            <Col span={12}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            {...register('name')}
                            disabled={!isFormEnabled}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="address">
                            Address:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            placeholder="Enter address"
                            {...register('address')}
                            disabled={!isFormEnabled}
                        />
                        {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="address">
                            Description:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="address"
                            type="text"
                            placeholder="Enter address"
                            {...register('description')}
                            disabled={!isFormEnabled}
                        />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="lat">
                            Latitude:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lat"
                            type="number"
                            placeholder="Enter latitude"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="lng">
                            Longitude:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lng"
                            type="number"
                            placeholder="Enter longitude"
                            disabled
                        />
                    </div>
                    <div className="flex items-center justify-left">
                        <div className='mr-5'>
                            <Button
                                type="submit"
                                title="Save"
                                variant="btn_green"
                                height="h-btn-md"
                                rounded="rounded-lg"
                                disabled={!isFormEnabled}
                            >
                                Save
                            </Button>
                        </div>
                        <div className='m-5'>
                            <Button
                                type="submit"
                                title="Update"
                                variant="btn_green"
                                height="h-btn-md"
                                rounded="rounded-lg"
                                onClick={handleCancel}
                                disabled={!isFormEnabled}
                            >
                                Update
                            </Button>
                        </div>
                        <div className='m-5'>
                            <Button
                                type="button"
                                title="Cancel"
                                variant="btn_green"
                                height="h-btn-md"
                                rounded="rounded-lg"
                                onClick={handleCancel}
                                disabled={!isFormEnabled}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </Col>
            <Col>
                <div className='w-96 h-96'>
                    {selectedPlace && (
                        <img
                            src={selectedPlace.image}
                            alt={selectedPlace.name}
                            className='w-96 h-96 object-cover rounded-lg'
                        />
                    )}
                </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
