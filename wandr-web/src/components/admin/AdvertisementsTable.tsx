'use client';

import React, {useState, useEffect} from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/general/Chip';
import {Row, Col, Input, Tag, Modal} from 'antd'; // Assuming this is where your BlogPost component is located
import { Avatar, Tooltip, Space,Button, message} from 'antd';
// import Button from '@/components/Button';
import { FrownOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { apiService, showNotification } from '@/services/apiService'
import LoadingPopup from '@/components/general/LoadingPopup';


const AdvertisementsTable = () => {
//   const [data, setData] = useState(tableData);
  const [currentSet, setCurrentSet] = useState([]);
  const [pendingAdvertisements, setPendingAdvertisements] = useState([]);
  const [approvedAdvertisements, setApprovedAdvertisements] = useState([]);
  const [status, setStatus] = useState('pendingAds');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPendingAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/ads/pending');
      console.log(response);
      
      if (response.success) {
        if (response.data) {
          const formattedData = response.data.map((item:any, index:any) => ({
            key: index + 1,
            number: index + 1,
            id: item.adId,
            shopName: item.shopName,
            shopImageUrl: item.image || '/advertisement.jpg',
            title: item.title,
            description: item.description,
            adImageUrl: item.image || '/advertisement2.jpeg',
            package: item.businessPlan,
            requestedDate: new Date(item.requestedDate).toLocaleDateString()
          }));
          setPendingAdvertisements(formattedData);
          if (status === 'pendingAds') {
            setCurrentSet(formattedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Pending Advertisement Details');
        } else {
          setPendingAdvertisements([]);
          if (status === 'pendingAds') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch advertisements');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Advertisement Details');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApprovedAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/ads/approved');
      console.log(response);
      if (response.success) {
        if (response.data) {
          const formattedData = response.data.map((item:any, index:any) => ({
            key: index + 1,
            number: index + 1,
            id: item.adId,
            shopName: item.shopName,
            shopImageUrl: item.image || '/loginPage.png',
            title: item.title,
            description: item.description,
            adImageUrl: item.image || '/loginPage.png',
            package: item.businessPlan,
            postedDate: new Date(item.postedDate).toLocaleDateString(),
            remainingDays: item.remainingDays
          }));
          setApprovedAdvertisements(formattedData);
          if (status === 'approvedAds') {
            setCurrentSet(formattedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Approved Advertisement Details');
        } else {
          setApprovedAdvertisements([]);
          if (status === 'approvedAds') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch advertisements');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Approved Advertisement Details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingAdvertisements();
    fetchApprovedAdvertisements();
  }, []);

  useEffect(() => {
    switch (status) {
      case 'pendingAds':
        setCurrentSet(pendingAdvertisements);
        break;
      case 'approvedAds':
        setCurrentSet(approvedAdvertisements);
        break;
      default:
        setCurrentSet(pendingAdvertisements);
        break;
    }
  }, [status, pendingAdvertisements, approvedAdvertisements]);

  const handleApprove = async (record_key: any) => {
    // Send an API call to approve the business registration request
    
    console.log("record.key",record_key);
    console.log("record.id",record_key);
    try {
      const response = await apiService.get(`/ads/approve/${record_key}`);
  
      if (response.success) {
        showNotification('success', 'Operation Status', response.message || 'Successfully Approved the Business');
        setPendingAdvertisements(prevData => prevData.filter(item => item.key !== record_key));
      } else {
        showNotification('error', 'Operation Status', response.message || 'Failed to approve the business');
      }
    } catch (error) {
      console.error('Error approving business:', error);
      showNotification('error', 'Operation Status', 'Successfully Approved the Business');
    }
  };

  const handleDecline = async (record_key: any) => {
    // Send an API call to approve the business registration request
    console.log("record.key",record_key);
    console.log("record.id",record_key);

    try {
      const response = await apiService.get(`/ads/decline/${record_key}`);
  
      if (response.success) {
        showNotification('success', 'Operation Status', response.message || 'Successfully Declined the Business');
        setApprovedAdvertisements(prevData => prevData.filter(item => item.key !== record_key));
      } else {
        showNotification('error', 'Operation Status', response.message || 'Failed to decline the business');
      }
    } catch (error) {
      console.error('Error declining business:', error);
      showNotification('error', 'Operation Status', 'Successfully Declined the Business');
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
            onClick={() => handleApprove(record.id)}
            type="text"
          />
          <Button
            icon={<FrownOutlined className='text-red-600' />}
            onClick={() => handleDecline(record.id)}
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
            onClick={() => handleApprove(record.id)}
            type="text"
          />
          <Button
            icon={<FrownOutlined className='text-red-600' />}
            onClick={() => handleDecline(record.id)}
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

  const filteredData = currentSet.filter((item) => {
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
                type={status === 'pendingAds' ? 'primary' : 'default'} 
                onClick={() => setStatus('pendingAds')}
                style={{
                    marginLeft: 8,
                    backgroundColor: status === 'pendingAds' ? '#609734' : undefined,
                    borderColor: status === 'pendingAds' ? '#609734' : undefined,
                }}
            >
                Pending Advertisements
            </Button>
        </Col>
        <Col span={4}>
            <Button 
                type={status === 'approvedAds' ? 'primary' : 'default'} 
                onClick={() => setStatus('approvedAds')} 
                style={{
                    marginLeft: 8,
                    backgroundColor: status === 'approvedAds' ? '#609734' : undefined,
                    borderColor: status === 'approvedAds' ? '#609734' : undefined,
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
          columns={status === 'pendingAds' ? columnsPending : columnsApproved} 
          data={(filteredData.length == 0 && searchText === '') ? currentSet : filteredData}
          title={status === 'pendingAds' ? 'Pending Advertisements' : 'Approved Advertisements'}
        />
        <LoadingPopup
          visible={isLoading}
          title="Fetching All Advertisement Details"
          description="Please wait while we gather all the details for you. This might take a moment."
        />
    </div>
  );
};

export default AdvertisementsTable;



