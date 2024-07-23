'use client';

import React, {useState} from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/general/Chip';
import {Row, Col, Input, Tag, Modal} from 'antd'; // Assuming this is where your BlogPost component is located
import { Avatar, Tooltip, Space,Button, message} from 'antd';
// import Button from '@/components/Button';
import { FrownOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';


const advertisements = {
    PendingAdvsertisements: [
        { 
            key: '1', 
            number: '1', 
            shopName: 'Trendy Threads',
            shopImageUrl: '/loginPage.png',
            title : 'Summer Sale Extravaganza',
            description : 'Enjoy up to 50% off on all summer collections. Limited time offer!',
            adImageUrl: '/loginPage.png',
            package : 'Gold',
            requestedDate: '2024-07-01'
        },
        { 
            key: '2', 
            number: '2', 
            shopName: 'Wanderlust Travels',
            shopImageUrl: '/loginPage.png',
            title : 'Exotic Beach Getaways',
            description : 'Discover pristine beaches and enjoy exclusive travel packages to the most exotic destinations.',
            adImageUrl: '/loginPage.png',
            package : 'Silver',
            requestedDate: '2024-07-03'
    
        },
        { 
            key: '3', 
            number: '3', 
            shopName: 'Adventure Seekers',
            shopImageUrl: '/loginPage.png',
            title : 'Mountain Climbing Adventures',
            description : 'Join our guided mountain climbing tours and conquer the highest peaks safely.',
            adImageUrl: '/loginPage.png',
            package : 'Bronze',
            requestedDate: '2024-07-03'
    
        },
      ],
      ApprovedAdvsertisements: [
        { 
            key: '1', 
            number: '1', 
            shopName: 'Cruise Away',
            shopImageUrl: '/loginPage.png',
            title : 'Luxury Cruise Packages',
            description : 'Experience the ultimate luxury with our all-inclusive cruise packages to breathtaking destinations.',
            adImageUrl: '/loginPage.png',
            package : 'Silver',
            postedDate: '2024-07-09',
            remainingDays: '10'
    
            },
        { 
            key: '2', 
            number: '2', 
            shopName: 'Sky High Adventures',
            shopImageUrl: '/loginPage.png',
            title : 'Hot Air Balloon Rides',
            description : ' Enjoy breathtaking views from above with our hot air balloon rides. Perfect for special occasions!',
            adImageUrl: '/loginPage.png',
            package : 'Bronze',
            postedDate: '2024-07-05',
            remainingDays: '05'
    
        },
        { 
            key: '3', 
            number: '3', 
            shopName: ' Jewel Elegance',
            shopImageUrl: '/loginPage.png',
            title : ' Elegant Ornaments Collection',
            description : 'Discover our exquisite collection of handcrafted ornaments. Perfect for adding a touch of elegance to any occasion.',
            adImageUrl: '/loginPage.png',
            package : 'Gold',
            postedDate: '2024-07-12',
            remainingDays: '12'
    
        },
      ]


}  
  

const AdvertisementsTable = () => {
//   const [data, setData] = useState(tableData);
  const [currentSet, setCurrentSet] = useState('PendingAdvsertisements');

  const handleApprove = async (record: any) => {
    // Send an API call to approve the business registration request
    try {
      const response = await fetch('/api/approveAdvertisement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId: record.key }),
      });
  
      if (response.ok) {
        message.success('Advertisement approved successfully');
        // Optionally update the table data to reflect the change
      } else {
        message.error('Failed to approve the Advertisement');
      }
    } catch (error) {
      console.error('Error approving Advertisement:', error);
      message.error('Error approving the Advertisement');
    }
  };

  const handleDecline = async (record: any) => {
    // Send an API call to decline the business registration request
    try {
      const response = await fetch('/api/declineAdvertisement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId: record.key }),
      });
  
      if (response.ok) {
        message.success('Advertisement declined successfully');
        // Optionally update the table data to reflect the change
      } else {
        message.error('Failed to decline the business');
      }
    } catch (error) {
      console.error('Error declining Advertisement:', error);
      message.error('Error declining the Advertisement');
    }
};

  

  const columnsPending = [
    { title: '#', dataIndex: 'number', key: 'number' },
    { 
        title: 'Shop Name', 
        dataIndex: 'shopName', 
        key: 'shopName',
        width: '200px',
        filterSearch: true,
        sorter: (a: any, b: any) => a.shopName.length - b.shopName.length,
        sortDirections: ['descend'],
    },
    { 
        title: 'Content', 
        dataIndex: 'content', 
        key: 'content',
        children: [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: '100px'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width:'300px'
            },
            {
                title: 'Image',
                dataIndex: 'adimage',
                key: 'adimage',
                render: (text: string, record: any) => (
                    <div className="flex items-center space-x-2 flex-row">
                      <Avatar src={record.adImageUrl} />
                      <span>{text}</span>
                    </div>
                ),
            },
        ],

    },
    { 
        title: 'Package', 
        dataIndex: 'package', 
        key: 'package',
        render: (text: string, record: any) => (
            < Chip
                text={text} // Adjust this to pass the appropriate text from your data
                size="small"
                color={text === 'Gold' ? 'gold' : text === 'Silver' ? 'silver' : 'brown'} // Adjust this to pass the appropriate color based on the type
            />
        ), 
    },
    { title: 'Requested On', dataIndex: 'requestedDate', key: 'requestedDate',width:'150px',sorter: (a: any, b: any) => new Date(a.requestedDate) - new Date(b.requestedDate), },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<SmileOutlined className='text-green-50' />}
            onClick={() => handleApprove(record.key)}
            type="text"
          />
          <Button
            icon={<FrownOutlined className='text-red-600' />}
            onClick={() => handleDecline(record.key)}
            type="text"
          />
        </Space>
      ),
    },
  ];

  const columnsApproved = [
    { title: '#', dataIndex: 'number', key: 'number' },
    { 
        title: 'Shop Name', 
        dataIndex: 'shopName', 
        key: 'shopName',
        width: '200px',
        filterSearch: true,
        sorter: (a: any, b: any) => a.shopName.length - b.shopName.length,
        sortDirections: ['descend'],
    },
    { 
        title: 'Content', 
        dataIndex: 'content', 
        key: 'content',
        children: [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: '100px'
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width:'300px'
            },
            {
                title: 'Image',
                dataIndex: 'adimage',
                key: 'adimage',
                render: (text: string, record: any) => (
                    <div className="flex items-center space-x-2 flex-row">
                      <Avatar src={record.adImageUrl} />
                      <span>{text}</span>
                    </div>
                ),
            },
        ],

    },
    { 
        title: 'Package', 
        dataIndex: 'package', 
        key: 'package',
        render: (text: string, record: any) => (
            < Chip
                text={text} // Adjust this to pass the appropriate text from your data
                size="small"
                color={text === 'Gold' ? 'gold' : text === 'Silver' ? 'silver' : 'brown'} // Adjust this to pass the appropriate color based on the type
            />
        ), 
    },
    { title: 'Posted On', dataIndex: 'postedDate', key: 'postedDate',width:'150px', sorter: (a: any, b: any) => new Date(a.requestedDate) - new Date(b.requestedDate), },
    { title: 'Remaining Days', dataIndex: 'remainingDays', key: 'remainingDays',sorter: (a: any, b: any) => new Date(a.remainingDays) - new Date(b.remainingDays), },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            icon={<SmileOutlined className='text-green-50' />}
            onClick={() => handleApprove(record.key)}
            type="text"
          />
          <Button
            icon={<FrownOutlined className='text-red-600' />}
            onClick={() => handleDecline(record.key)}
            type="text"
          />
        </Space>
      ),
    },
  ];

  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  // const filterData = (data: any[], searchText: string) => {
  //   return data.filter((item) =>
  //     item.name.toLowerCase().includes(searchText.toLowerCase())
  //   );
  // };

  const filteredData = advertisements[currentSet].filter((item) => {
    const searchTextLower = searchText.toLowerCase();
    return (
      item.shopName.toLowerCase().includes(searchTextLower) ||
      item.title.toLowerCase().includes(searchTextLower)
    );
  });

  return (
    <div className="p-4 gap-4 m-3">
      <Row align={'middle'} gutter={8}>
        <Col span={4}>
            <Button 
                type={currentSet === 'PendingAdvsertisements' ? 'primary' : 'default'} 
                onClick={() => setCurrentSet('PendingAdvsertisements')}
                style={{
                    marginLeft: 8,
                    backgroundColor: currentSet === 'PendingAdvsertisements' ? '#609734' : undefined,
                    borderColor: currentSet === 'PendingAdvsertisements' ? '#609734' : undefined,
                }}
            >
                Pending Advertisements
            </Button>
        </Col>
        <Col span={4}>
            <Button 
                type={currentSet === 'ApprovedAdvsertisements' ? 'primary' : 'default'} 
                onClick={() => setCurrentSet('ApprovedAdvsertisements')} 
                style={{
                    marginLeft: 8,
                    backgroundColor: currentSet === 'ApprovedAdvsertisements' ? '#609734' : undefined,
                    borderColor: currentSet === 'ApprovedAdvsertisements' ? '#609734' : undefined,
                  }}
            >
                Approved Advertisements
            </Button>
        </Col>
        <Col span={8} offset={6}>
          <Input
            placeholder="Search by Shop Name or Title..."
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 16, width:'512px', height:'40px' }}
            prefix={<SearchOutlined style={{color:'#609734'}}/>}
          />
        </Col>
      </Row>
        <TableCard 
          columns={currentSet === 'PendingAdvsertisements' ? columnsPending : columnsApproved} 
          data={(filteredData.length == 0 && searchText === '') ? advertisements[currentSet] : filteredData}
          title="Advertisements"
        />
    </div>
  );
};

export default AdvertisementsTable;



