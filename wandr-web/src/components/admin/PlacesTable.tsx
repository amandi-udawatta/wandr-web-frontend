// pages/blog/index.tsx

'use client';

import React, {useState} from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/Chip';
import {Row, Col, Input} from 'antd'; // Assuming this is where your BlogPost component is located
import { Avatar, Tooltip, Space,Button, message} from 'antd';
// import Button from '@/components/Button';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
  
  const tableData = [
    { 
      key: '1', 
      number: '1', 
      name: 'Sigiriya', 
      imageUrl: '/sigiriya.png', 
      category: 'Rocks', 
      chipImage: '/categoryRock.png', 
      location: '7.956944,  80.759720', 
      address: 'Matale, Sri Lanka',
      description: 'Sigiriya is a fifth century fortress in Sri Lanka which has been carved out of an inselberg, a hill of hard volcanic rock. It towers around 600 feet (182.8m) from the forest and gardens below, and has a flat top. This is where the palace of King Kasyapa once stood, reachable up a winding stone staircase.',
      activities: [
        { imageUrl: '/activityHillClimbing.png', text: 'Hiking' },
        { imageUrl: '/activitySwimming.png', text: 'Swimming' },
        { imageUrl: '/activityCulture.png', text: 'Cultural Exploration' },
      ],
    },
    { key: '2', 
      number: '2', 
      name: 'Nilaweli Beach', 
      imageUrl: '/nilaweli.png', 
      category: 'Ocean', 
      chipImage: '/categoryOcean.png', 
      location: '7.956944,  80.759720', 
      address: 'Trincomalee, Sri Lanka',
      description: 'Nilaveli beach is a quiet and relaxed beach, great for travellers looking for some rest and relaxation, some diving and snorkelling if of interest, from here one can also do a day trip to the elephant corridors around sigiriya and see some amazing herds of wild elephants.',
      activities: [
        { imageUrl: '/activitySwimming.png', text: 'Swimming' },
      ],
    },
    { key: '3', 
      number: '3', 
      name: 'Sigiriya', 
      imageUrl: '/sigiriya.png', 
      category: 'Rocks', 
      chipImage: '/categoryRock.png', 
      location: '7.956944,  80.759720', 
      address: 'Matale, Sri Lanka',
      description: 'Sigiriya is a fifth century fortress in Sri Lanka which has been carved out of an inselberg, a hill of hard volcanic rock. It towers around 600 feet (182.8m) from the forest and gardens below, and has a flat top. This is where the palace of King Kasyapa once stood, reachable up a winding stone staircase.',
      activities: [
        { imageUrl: '/activitySwimming.png', text: 'Swimming' },
      ],
    },
  ]

const PlacesTable = () => {
  const [data, setData] = useState(tableData);

  const handleDelete = async (key: string) => {
    try {
      const response = await fetch(`/api/delete/${key}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Remove the row from the table data
        setData(prevData => prevData.filter(item => item.key !== key));
        console.log('Delete successful');
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error:', error);
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
    { title: 'Address', 
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: any) => (
        <Chip
            imageUrl={record.chipImage} // Replace with the appropriate image URL from your data
            text={record.category} // Adjust this to pass the appropriate text from your data
            size="default"
        />
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
      render: (text: string ,record: any) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined className='text-red-600' />}
            onClick={() => handleDelete(record.key)}
            type="text"
          />
        </Space>
      ),
    },

  ]

  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    // filterData(tableData, e.target.value);
  };

  // const filterData = (data: any[], searchText: string) => {
  //   return data.filter((item) =>
  //     item.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // };

  const filteredData = data.filter((item) => {
    const searchTextLower = searchText.toLowerCase();
  
    // Check if any of the fields contain the search text
    return (
      item.name.toLowerCase().includes(searchTextLower) ||
      item.address.toLowerCase().includes(searchTextLower) ||
      item.category.toLowerCase().includes(searchTextLower) ||
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
            style={{ marginBottom: 16, width:'500px', height:'40px' }}
            prefix={<SearchOutlined style={{color:'#609734'}}/>}
          />
        </Col>
        <Col span={8}>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: 'right', backgroundColor: '#609734', borderColor: '#609734' }}
            >
              Add New Place
            </Button>
          </div>
        </Col>

       </Row>
        <TableCard 
          columns={tableColumns} 
          data={(filteredData.length == 0 && searchText === '') ? tableData : filteredData}
          title="Places"
        />
    </div>
  );
};

export default PlacesTable;