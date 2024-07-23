// pages/blog/index.tsx

'use client';

import React, { useState, useEffect } from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/general/Chip';
import { Row, Col, Input, Avatar, Tooltip, Space, Button, message } from 'antd';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { apiService, showNotification } from '@/services/apiService';
import Cookies from 'js-cookie';
import { CATEGORY_IMAGES, ACTIVITY_IMAGES } from '@/constants';
import LoadingPopup from '@/components/general/LoadingPopup';


// Define the types for better TypeScript support
interface Category {
  imageUrl: string;
  text: string;
}

interface Activity {
  imageUrl: string;
  text: string;
}

interface Place {
  key: string;
  number: string;
  name: string;
  imageUrl: string;
  categories: Category[];
  chipImage: string;
  location: string;
  address: string;
  description: string;
  activities: Activity[];
}

const PlacesTable = () => {
  const [data, setData] = useState<Place[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/places');
        // console.log(response.data);

        if (response.success) {
          const transformedData = response.data.map((place: any, index: number) => ({
            key: place.id.toString(),
            number: (index + 1).toString(),
            name: place.name,
            imageUrl: place.image, // Placeholder image
            // setValue('image', 'http://localhost:8080/uploads/places/1721289392137.jpg');
            categories: place.categories.map((category: string) => {
              const matchedCategory = CATEGORY_IMAGES.find(cat => cat.category === category);
              return {
                imageUrl: matchedCategory ? matchedCategory.image : '/categories/categoryRock.png',
                text: category,
              };
            }),
            chipImage: '/categories/categoryRock.png', // Placeholder image
            location: `${place.latitude}, ${place.longitude}`,
            address: place.address,
            description: place.description,
            activities: place.activities.map((activity: string) => {
              const matchedActivity = ACTIVITY_IMAGES.find(act => act.activity === activity);
              return {
                imageUrl: matchedActivity ? matchedActivity.image : '/activities/activityCamping.png',
                text: activity,
              };
            }),
          }));

          setData(transformedData);
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Place Details');
        } else {
          throw new Error(response.message || 'Failed to fetch places');
        }
      } catch (error) {
        showNotification('error', 'Operation Status', 'Error Fetching Place Details');
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (place_id: any) => {
    const token = Cookies.get('accessToken');

    try {
      const response = await apiService.delete(`/places/delete/${place_id}`);

      showNotification('success', 'Operation Status', response.message || 'Successfully Deleted the place');
      setData(prevData => prevData.filter(item => item.key !== place_id));

    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Deleting Place');
    }
  };

  const tableColumns = [
    { title: '#', dataIndex: 'number', key: 'number' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-2 flex-row">
          <Avatar src={record.imageUrl} />
          <span>{text}</span>
        </div>
      ),
      width: '200px',
      filterSearch: true,
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => (
        <Tooltip title={text}>
          <span>
            {text.length > 50 ? `${text.slice(0, 50)}... ` : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (chips: { imageUrl: string; text: string }[]) => (
        <div className="flex gap-2 flex-col">
          {chips && chips.length > 0 ? (
            chips.map((chip, index) => (
              <Chip
                key={index}
                imageUrl={chip.imageUrl}
                text={chip.text}
                size="small"
              />
            ))
          ) : (
            <span className='text-gray-500 italic'>No categories available</span>
          )}
        </div>
      ),
    },
    {
      title: 'Activities',
      dataIndex: 'activities',
      key: 'activities',
      render: (chips: { imageUrl: string; text: string }[]) => (
        <div className="flex gap-2 flex-col">
          {chips && chips.length > 0 ? (
            chips.map((chip, index) => (
              <Chip
                key={index}
                imageUrl={chip.imageUrl}
                text={chip.text}
                size="small"
              />
            ))
          ) : (
            <span className='text-gray-500 italic'>No activities available</span>
          )}
        </div>
      ),
      width: '150px'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined className='text-red-600' />}
            onClick={() => handleCancel(record.key)}
            type="text"
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) => {
    const searchTextLower = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchTextLower) ||
      item.address.toLowerCase().includes(searchTextLower) ||
      item.categories.some((category) =>
        category.text.toLowerCase().includes(searchTextLower)
      ) ||
      item.description.toLowerCase().includes(searchTextLower) ||
      item.activities.some((activity) =>
        activity.text.toLowerCase().includes(searchTextLower)
      )
    );
  });

  return (
    <div className="p-4 gap-4 m-3">
      <Row align={'middle'} gutter={8}>
        <Col span={16}>
          <Input
            placeholder="Search by name, address, category, description, or activity..."
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 16, width: '500px', height: '40px' }}
            prefix={<SearchOutlined style={{ color: '#609734' }} />}
          />
        </Col>
        <Col span={8}>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: 'right', backgroundColor: '#609734', borderColor: '#609734' }}
              href='/api/admin/places/add'
            >
              Add New Place
            </Button>
          </div>
        </Col>
      </Row>
      <TableCard
        columns={tableColumns}
        data={(filteredData.length === 0 && searchText === '') ? data : filteredData}
        title="Places"
      />
      <LoadingPopup
        visible={isLoading}
        title="Fetching All Places"
        description="Please wait while we gather all the details for you. This might take a moment."
      />
    </div>
  );
};

export default PlacesTable;
