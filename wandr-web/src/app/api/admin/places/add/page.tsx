'use client'

import React, { useState } from 'react';
import {Col, message, Row } from 'antd';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Chip from '@/components/general/Chip';
import { CATEGORY_IMAGES, ACTIVITY_IMAGES } from '@/constants';

import PlaceAutocomplete from '@/components/admin/PlaceAutoComplete';
import AdminSidebar from '@/components/admin/AdminSideBar';
import AdminHeader from '@/components/admin/AdminHeader';
import { placeValidationSchema } from '@/validations/placeValidationSchema';
import Button from '@/components/general/Button';
import LoadingPopup from '@/components/general/LoadingPopup';

import { apiService, showNotification } from '@/services/apiService';


const libraries: ('places')[] = ['places'];

interface PlaceFormInputs {
  id: string;
  name: string;
  address: string;
  description: string;
  latitude: string;
  longitude: string;
  image: string;
  categories: string[];
  activities: string[];
}

let place_id:any;

const PlacesPage = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    reset 
  } = useForm<PlaceFormInputs>({
    resolver: yupResolver(placeValidationSchema),
  });

  const [isFormEnabled, setIsFormEnabled] = useState(false);

  const handlePlaceSelect = async (place: any) => {

    const placeId = place.placeId;
    console.log(placeId);
    setIsLoading(true);

    try{
      const response = await apiService.get(`/places/add?placeId=${placeId}`);


      showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Place Details');

      console.log('Fetch response:', response);

      const data = response.data;
      console.log(data);

      place_id = data.id;

      setValue('name', data.name);
      setValue('address', data.address);
      setValue('description', data.description);
      setValue('latitude', data.latitude);
      setValue('longitude', data.longitude);
      setValue('image', data.image);
      setCategories(data.categories);
      setActivities(data.activities);
      setIsFormEnabled(true);

    }
    catch(error){
      showNotification('error', 'Fetch Status', 'Failed to Get details.');
      console.error('Fetching error:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    console.log(place_id);

    try {
      const response = await apiService.delete(`/places/delete/${place_id}`);

      showNotification('success', 'Operation Status', response.message || 'Successfully Cancelled the operation');

      console.log('Fetch response:', response);

      setSelectedPlace(null);
      reset();
      setIsFormEnabled(false);
      setCategories([]);
      setActivities([]);

    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Cancelling Place Details');
    }
  };

  const onSubmit: SubmitHandler<PlaceFormInputs> = async (data) => {
    try {
      const response = await apiService.post(`/places/update/${place_id}`, {
          name: data.name,
          address: data.address,
          description: data.description,
      });

      showNotification('success', 'Operation Status', response.message || 'Successfully Updated Place Details');

      console.log('Fetch response:', response);
      setSelectedPlace(null);
      reset();
      setIsFormEnabled(false);
      setCategories([]);
      setActivities([]);

    } catch (error) {
        showNotification('error', 'Operation Status', 'Error Updating Place Details');
    }
  };


  const handleSave = async () => {
    setSelectedPlace(null);
    reset();
    setIsFormEnabled(false);
    setCategories([]);
    setActivities([]);
    showNotification('success', 'Operation Status', 'Successfully Saved');
  }

  const getCategoryImage = (category: any) => {
    const matchedCategory = CATEGORY_IMAGES.find(cat => cat.category.toLowerCase() === category.toLowerCase());
    return matchedCategory ? matchedCategory.image : '/categories/categoryRock.png';
  };

  const getActivityImage = (activity: any) => {
    const matchedActivity = ACTIVITY_IMAGES.find(act => act.activity.toLowerCase() === activity.toLowerCase());
    return matchedActivity ? matchedActivity.image : '/activities/activityCamping.png';
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Places Management'} />
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Places Management - Add New'} />
        <div className="flex-1 overflow-y-auto p-8">
          
          <Row className='m-5'>
            <Col span={24}>
              <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} options={{
                types: ['tourist_attraction'],
                componentRestrictions: { country: 'LK' },
              }} />
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
                            placeholder="Name will be loaded here..."
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
                            placeholder="Address will be loaded here..."
                            {...register('address')}
                            disabled={!isFormEnabled}
                        />
                        {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="description">
                            Description:
                        </label>
                        <textarea
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Description will be loaded here..."
                            {...register('description')}
                            disabled={!isFormEnabled}
                        />
                        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="latitude">
                            Latitude:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="latitude"
                            type="text"
                            placeholder="Latitude will be loaded here..."
                            {...register('latitude')}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-90 text-sm font-bold mb-2" htmlFor="longitude">
                            Longitude:
                        </label>
                        <input
                            className="appearance-none border border-green-50 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="longitude"
                            type="text"
                            placeholder="Longitude will be loaded here..."
                            {...register('longitude')}
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
                                onClick={handleSave}
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
                                onClick={handleSubmit(onSubmit)}
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
            <Col span={11} className='ml-12 flex flex-col justify-center mt-5'>
              <Row className='justify-center'>
                <div className='w-96 h-96 border border-black rounded-lg'>
                    {selectedPlace && (
                        <img
                            src={selectedPlace.image}
                            alt={selectedPlace.name}
                            className='w-96 h-96 object-cover rounded-lg'
                        />
                    )}
                </div>
              </Row>
              <Row className='m-5'>
                  <div className="mb-4">
                    <label className="block text-green-90 text-sm font-bold mb-2">
                      Categories:
                    </label>
                    <div className="flex gap-2 flex-col">
                      {categories && categories.length > 0 ? (
                        categories.map((category, index) => (
                          <Chip
                            key={index}
                            imageUrl={getCategoryImage(category)}
                            text={category}
                            size="default"
                          />
                        ))
                      ) : (
                        <span className='text-gray-500'>Categories will be loaded here...</span>
                      )}
                    </div>
                  </div>
              </Row>

              <Row className='m-5'>
                  <div className="mb-4">
                    <label className="block text-green-90 text-sm font-bold mb-2">
                      Activities:
                    </label>
                    <div className="flex gap-2 flex-col">
                      {activities && activities.length > 0 ? (
                        activities.map((activity, index) => (
                          <Chip
                            key={index}
                            imageUrl={getActivityImage(activity)}
                            text={activity}
                            size="default"
                          />
                        ))
                      ) : (
                        <span className='text-gray-500'>Activities will be loaded here...</span>
                      )}
                    </div>
                  </div>
              </Row>
            </Col>
          </Row>
        </div>
        <LoadingPopup
          visible={isLoading}
          title="Fetching Place Details"
          description="Generating just the right description, categories and activities for the place! Please wait...."
        />
      </div>
    </div>
  );
};

export default PlacesPage;