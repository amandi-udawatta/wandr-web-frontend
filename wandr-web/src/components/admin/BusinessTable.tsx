//General Details

// number
// name
// address
// location
// type
// image
// email address
// contact number - business
// website URL
// description
// services
// languages

//Owner Details

// owner name
// owner contact
// owner NIC


// Account created at
// Actions - Approve or Decline 

// pages/blog/index.tsx

'use client';

import React, {useState} from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/general/Chip';
import {Row, Col, Input, Tag, Modal} from 'antd'; // Assuming this is where your BlogPost component is located
import { Avatar, Tooltip, Space,Button, message} from 'antd';
// import Button from '@/components/Button';
import { DeleteOutlined, EyeOutlined, FrownOutlined, PlusOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
  
  const tableData = [
    { 
      key: '1', 
      number: '1', 
      name: 'Rathna Jewelleries',
      address : 'No.234, Galle Road, Colombo 03',
      type : 'Shop',
      imageUrl: '/loginPage.png',
      contact: '0771234567',
      emailAddress: 'rathna@example.com',
      ownerName: 'John Doe',
      accountCreated: '2022-01-01',
    },
    { key: '2', 
      number: '2', 
      name: 'Sri Lankan Tours',
      address : 'No.234, Galle Road, Colombo 03',
      type : 'Service Provider',
      imageUrl: '/loginPage.png',
      contact: '0771234567',
      emailAddress: 'sriLankanTours@example.com',
      ownerName: 'Jane Doe',
      accountCreated: '2022-01-02',
    },
    { 
      key: '3', 
      number: '3', 
      name: 'Sigiriya Food and Beverages',
      address : 'No.234, Galle Road, Colombo 03',
      type : 'Service Provider',
      imageUrl: '/loginPage.png',
      contact: '0771234567',
      emailAddress:'sigiriyaFood@example.com',
      ownerName: 'David Doe',
      accountCreated: '2022-01-03',
    },
  ]

const BusinessTable = () => {
  const [data, setData] = useState(tableData);

  const handleView = (record: any) => {
    // Show full details of the business
    Modal.info({
      title: `Details of ${record.name}`,
      content: (
        <div>
          <p><strong>Address:</strong> {record.address}</p>
          <p><strong>Type:</strong> {record.type}</p>
          <p><strong>Contact:</strong> {record.contact}</p>
          <p><strong>Email Address:</strong> {record.emailAddress}</p>
          <p><strong>Owner Name:</strong> {record.ownerName}</p>
          <p><strong>Account Created:</strong> {record.accountCreated}</p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleApprove = async (record: any) => {
    // Send an API call to approve the business registration request
    try {
      const response = await fetch('/api/approveBusiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId: record.key }),
      });
  
      if (response.ok) {
        message.success('Business approved successfully');
        // Optionally update the table data to reflect the change
      } else {
        message.error('Failed to approve the business');
      }
    } catch (error) {
      console.error('Error approving business:', error);
      message.error('Error approving the business');
    }
  };

  const handleDecline = async (record: any) => {
    // Send an API call to decline the business registration request
    try {
      const response = await fetch('/api/declineBusiness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessId: record.key }),
      });
  
      if (response.ok) {
        message.success('Business declined successfully');
        // Optionally update the table data to reflect the change
      } else {
        message.error('Failed to decline the business');
      }
    } catch (error) {
      console.error('Error declining business:', error);
      message.error('Error declining the business');
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
        width: '300px',
        filterSearch: true,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    { 
        title: 'Type', 
        dataIndex: 'type', 
        key: 'type',
        render: (text: string, record: any) => (
            < Chip
                text={text} // Adjust this to pass the appropriate text from your data
                size="small"
                color={text === 'Shop' ? 'orange' : 'purple'} // Adjust this to pass the appropriate color based on the type
            />
        ), 
    },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Email Address', dataIndex: 'emailAddress', key: 'emailAddress' },
    { title: 'Owner Name', dataIndex: 'ownerName', key: 'ownerName' },
    { title: 'Account Created', dataIndex: 'accountCreated', key: 'accountCreated', sorter: (a: any, b: any) => new Date(a.accountCreated) - new Date(b.accountCreated), },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
        <Button
            icon={<EyeOutlined className='text-blue-600' />}
            onClick={() => handleView(record)}
            type="text"
          />
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
      item.ownerName.toLowerCase().includes(searchTextLower)
    );
  });

  return (
    <div className="p-4 gap-4 m-3">
       <Row align={'middle'} gutter={8}>
        <Col span={16}>
          <Input
            placeholder="Search by name or owner name..."
            value={searchText}
            onChange={handleSearch}
            style={{ marginBottom: 16, width:'500px', height:'40px' }}
            prefix={<SearchOutlined style={{color:'#609734'}}/>}
          />
        </Col>
       </Row>
        <TableCard 
          columns={tableColumns} 
          data={(filteredData.length == 0 && searchText === '') ? tableData : filteredData}
          title="Businesses"
        />
    </div>
  );
};

export default BusinessTable;



