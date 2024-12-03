'use client'

import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Button, Rate, List, Avatar, Tag, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MapComponent from '@/components/general/MapViewComponent';
import {useRouter} from 'next/navigation';
import {getIdFromToken} from '@/services/tokenDecodeService';
import { apiService } from '@/services/apiService'; // Importing the apiService
import { showNotification } from '@/services/apiService'; // Assuming showNotification is also exported from the same service

interface Business {
  businessId?: number;
  name: string;
  description: string;
  services: string[];
  address: string;
  languages: string[];
  website_url: string;
  business_contact: string;
  profile_image: string | null;
  shop_image: string;
  rating: number;
  owner_name: string;
  owner_contact: string;
  owner_nic: string;
  email: string;
  latitude: number;
  longitude: number;
  business_type: string; // Changed to string to match backend data
  shopCategory?: string | null; // Updated to handle nullable categories
}

const ProfilePageComponent: React.FC = () => {
  const [businessData, setBusinessData] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch business data on page load
  useEffect(() => {
    const fetchBusinessData = async () => {
      setIsLoading(true);
      try {
        const businessId = getIdFromToken();

        const response = await apiService.get(`/business/${businessId}`);
        if (response.success) {
          // Map the response data to the business object
          const mappedData: Business = {
            businessId: businessId || undefined, // Handle null value
            name: response.data.name,
            description: response.data.description,
            services: response.data.services,
            address: response.data.address,
            languages: response.data.languages,
            website_url: response.data.websiteUrl,
            business_contact: response.data.businessContact,
            profile_image: response.data.profileImage || null, // Handle null value
            shop_image: response.data.shopImage,
            rating: response.data.rating,
            owner_name: response.data.ownerName,
            owner_contact: response.data.ownerContact,
            owner_nic: response.data.ownerNic,
            email: response.data.email,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            business_type: response.data.businessType,
            shopCategory: response.data.shopCategory || null, // Handle null category
          };

          setBusinessData(mappedData); // Set the mapped data
          showNotification('success', 'Operation Status', 'Successfully Fetched Business Details');
        } else {
          throw new Error(response.message || 'Failed to fetch business details');
        }
      } catch (error) {
        showNotification('error', 'Operation Status', 'Error Fetching Business Details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessData();
  }, []);

  const isShop = businessData?.business_type === 'Shop';

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading indicator while the data is being fetched
  }

  if (!businessData) {
    return <div>No business data found</div>; // Handle the case where no business data is returned
  }

  const handleEdit = () => {
    router.push(`/api/business/profile/edit`); // Pass the businessId via query string
  };

  return (
    <div className="p-6 rounded-lg mx-5">
      <Card
        extra={
          <Button 
            onClick={handleEdit} 
            type="primary"
            className='bg-green-50'
            icon={<EditOutlined />}
          >
            Edit Profile
          </Button>
        }
        style={{ width: '100%' }}
      >
        <div className="relative">
          <img
            src={businessData.shop_image}
            alt="Shop"
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
            <Avatar size={128} src={businessData.profile_image || "/person-1.png"} shape="square" />
          </div>
        </div>

        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold">{businessData.name}</h1>
          <p className="text-lg">Owned by {businessData.owner_name}</p>
        </div>

        <Descriptions bordered column={2} style={{ marginTop: '20px' }}>
          <Descriptions.Item label="Address">{businessData.address}</Descriptions.Item>
          <Descriptions.Item label="Website">
            <a href={businessData.website_url} target="_blank" rel="noopener noreferrer">
              {businessData.website_url}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Languages">{businessData.languages.join(', ')}</Descriptions.Item>
          <Descriptions.Item label="Rating">
            <Rate disabled value={businessData.rating} />
          </Descriptions.Item>
          <Descriptions.Item label="Business Contact">{businessData.business_contact}</Descriptions.Item>
          <Descriptions.Item label="Owner Contact">{businessData.owner_contact}</Descriptions.Item>
          <Descriptions.Item label="NIC">{businessData.owner_nic}</Descriptions.Item>
          <Descriptions.Item label="Email">{businessData.email}</Descriptions.Item>
          <Descriptions.Item label="Category">
            <Tag color={isShop ? 'green' : 'blue'}>
              {businessData.shopCategory || 'No category available'}
            </Tag>
          </Descriptions.Item>
        </Descriptions>

        <div className="flex justify-between mt-8">
          <div className="w-1/2 pr-4">
            <h3 className="text-lg font-semibold mb-2">Services</h3>
            <List
              bordered
              dataSource={businessData.services}
              renderItem={(service) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<span className="text-xl font-bold text-green-600">•</span>}
                    title={service}
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-2">Location on Map</h3>
            <MapComponent latitude={businessData.latitude} longitude={businessData.longitude} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePageComponent;
