'use client';

import React, { useState, useEffect } from 'react';
import TableCard from '@/components/admin/TableCard';
import Chip from '@/components/general/Chip';
import {Row, Col, Input, Tag, Modal} from 'antd'; // Assuming this is where your BlogPost component is located
import { Avatar, Space,Button, message} from 'antd';
import {EyeOutlined, FrownOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
import LoadingPopup from '@/components/general/LoadingPopup';
import { apiService, showNotification } from '@/services/apiService';
  
  const mapBackendDataToBusiness = (backendData:any) => {
    return backendData.map((item:any, index:any) => ({
      key: String(index + 1), // Ensuring the key is a string
      number: String(index + 1), // Ensuring the number is a string
      name: item.name,
      address: item.address,
      type: item.businessType == 'Shop' ? item.shopCategory : item.businessType,
      imageUrl: item.shopImage, // Assuming the images are stored in the /images directory
      contact: item.businessContact,
      emailAddress: item.email,
      ownerName: item.ownerName,
      accountCreated: new Date(item.createdAt).toLocaleDateString(), // Formatting the date to a readable format
    }));
  };

  const mapBackendDataToPaidBusiness = (backendData:any) => {
    return backendData.map((item:any, index:any) => ({
      key: String(index + 1), // Ensuring the key is a string
      number: String(index + 1), // Ensuring the number is a string
      name: item.name,
      address: item.address,
      type: item.businessType == 'Shop' ? item.shopCategory : item.businessType,
      imageUrl: item.shopImage, // Assuming the images are stored in the /images directory
      contact: item.businessContact,
      emailAddress: item.email,
      ownerName: item.ownerName,
      accountCreated: new Date(item.createdAt).toLocaleDateString(), // Formatting the date to a readable format
      plan: item.plan,
      paymentAmount: item.paymentAmount,
      paidDate: new Date(item.paidDate).toLocaleDateString(),
      planExpiryDate: new Date(item.planEndDate).toLocaleDateString(),
      remainingDates: item.remainingDays,
    }));
  };

const BusinessTable = () => {
  const [pendingBusiness, setPendingBusiness] = useState([]);
  const [approvedBusiness, setApprovedBusiness] = useState([]);
  const [paidBusiness, setPaidBusiness] = useState([]);
  const [currentSet, setCurrentSet] = useState([]);
  const [status, setStatus] = useState('pendingBusiness');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPendingData = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/business/pending');
      console.log(response);
  
      if (response.success) {
        if (response.data) {
          const transformedData = mapBackendDataToBusiness(response.data);
          setPendingBusiness(transformedData);
          if (status === 'pendingBusiness') {
            setCurrentSet(transformedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Business Details');
        } else {
          // If response.data is null or undefined, set the state to an empty array or handle accordingly
          setPendingBusiness([]);
          if (status === 'pendingBusiness') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        }
      } else {
        throw new Error(response.message || 'Failed to fetch business');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Business Details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  const fetchApprovedData = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/business/approved');

      if (response.success) {
        if (response.data) {
          const transformedData = mapBackendDataToBusiness(response.data);
          setApprovedBusiness(transformedData);
          if (status === 'approvedBusiness') {
            setCurrentSet(transformedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Business Details');
        } else {
          // If response.data is null or undefined, set the state to an empty array or handle accordingly
          setApprovedBusiness([]);
          if (status === 'approvedBusiness') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        } 
      }
      else {
        throw new Error(response.message || 'Failed to fetch businesses');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Business Details');
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchPaidData = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.get('/business/paid');

      if (response.success) {
        if (response.data) {
          const transformedData = mapBackendDataToPaidBusiness(response.data);
          setPaidBusiness(transformedData);
          if (status === 'paidBusiness') {
            setCurrentSet(transformedData);
          }
          showNotification('success', 'Operation Status', response.message || 'Successfully Fetched Business Details');
        } else {
          // If response.data is null or undefined, set the state to an empty array or handle accordingly
          setPaidBusiness([]);
          if (status === 'paidBusiness') {
            setCurrentSet([]);
          }
          showNotification('warning', 'Operation Status', 'No data available');
        } 
      }
      else {
        throw new Error(response.message || 'Failed to fetch businesses');
      }
    } catch (error) {
      showNotification('error', 'Operation Status', 'Error Fetching Business Details');
    }
    finally {
      setIsLoading(false);
    }
  };

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
                color={text === 'Service Provider' ? 'purple' : 'orange'} // Adjust this to pass the appropriate color based on the type
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
      render: (text:any, record:any) => actionsByStatus[status](record, handleView, handleApprove, handleDecline),
    },
  ];

  const paidColumns = [
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
        width: '250px',
        filterSearch: true,
        sorter: (a: any, b: any) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    { title: 'Selected Plan', dataIndex: 'plan', key: 'plan' },
    { title: 'Payment Amount', dataIndex: 'paymentAmount', key: 'paymentAmount' },
    { title: 'Paid Date', dataIndex: 'paidDate', key: 'paidDate', sorter: (a: any, b: any) => new Date(a.paidDate) - new Date(b.paidDate), },
    { title: 'Plan Expiry Date', dataIndex: 'planExpiryDate', key: 'planExpiryDate', sorter: (a: any, b: any) => new Date(a.planExpiryDate) - new Date(b.planExpiryDate), },
    { title: 'Remaining Dates', dataIndex: 'remainingDates', key: 'remainingDates', sorter: (a: any, b: any) => new Date(a.remainingDates) - new Date(b.remainingDates), },
    {
      title: 'Action',
      key: 'action',
      render: (text:any, record:any) => actionsByStatus["paidBusiness"](record, handleView, handleDecline),
    },
  ];

  const actionsByStatus = {
    pendingBusiness: (record:any, handleView:any, handleApprove:any, handleDecline:any) => (
      <Space size="middle">
        <Button
          icon={<EyeOutlined className='text-blue-600' />}
          onClick={() => handleView(record)}
          type="text"
        />
        <Button
          icon={<SmileOutlined className='text-green-600' />}
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
    approvedBusiness: (record: any, handleView: any) => (
      <Space size="middle">
        <Button
          icon={<EyeOutlined className='text-blue-600' />}
          onClick={() => handleView(record)}
          type="text"
        />
        <Button
          icon={<FrownOutlined className='text-red-600' />}
          onClick={() => handleDecline(record.key)}
          type="text"
        />
      </Space>
    ),
    paidBusiness: (record:any , handleView: any, handleRefund: any) => (
      <Space size="middle">
        <Button
          icon={<EyeOutlined className='text-blue-600' />}
          onClick={() => handleView(record)}
          type="text"
        />
        <Button
          icon={<FrownOutlined className='text-red-600' />}
          onClick={() => handleDecline(record.key)}
          type="text"
        />
        {/* <Button
          icon={<DollarOutlined className='text-green-600' />}
          onClick={() => handleRefund(record.key)}
          type="text"
        /> */}
      </Space>
    ),
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const filteredData = currentSet.filter((item) => {
    const searchTextLower = searchText.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchTextLower) ||
      item.ownerName.toLowerCase().includes(searchTextLower)
    );
  });

  return (
    <div className="p-4 gap-4 m-3">
       <Row align={'middle'}>
        <Col span={3} className='mr-3'>
            <Button 
                type={status === 'pendingBusiness' ? 'primary' : 'default'} 
                onClick={() => { setStatus('pendingBusiness'); fetchPendingData(); }}
                style={{
                    marginLeft: 8,
                    backgroundColor: status === 'pendingBusiness' ? '#609734' : undefined,
                    borderColor: status === 'pendingBusiness' ? '#609734' : undefined,
                }}
            >
                Pending Businesses
            </Button>
        </Col>
        <Col span={3} className='mr-6'>
            <Button 
                type={status === 'approvedBusiness' ? 'primary' : 'default'} 
                onClick={() => { setStatus('approvedBusiness'); fetchApprovedData();}} 
                style={{
                    marginLeft: 8,
                    backgroundColor: status === 'approvedBusiness' ? '#609734' : undefined,
                    borderColor: status === 'approvedBusiness' ? '#609734' : undefined,
                  }}
            >
                Approved Businesses
            </Button>
        </Col>
        <Col span={3}  className='mr-3'>
            <Button 
                type={status === 'paidBusiness' ? 'primary' : 'default'} 
                onClick={() => {setStatus('paidBusiness');  fetchPaidData(); }} 
                style={{
                    marginLeft: 8,
                    backgroundColor: status === 'paidBusiness' ? '#609734' : undefined,
                    borderColor: status === 'paidBusiness' ? '#609734' : undefined,
                  }}
            >
                Paid Businesses
            </Button>
        </Col>
        <Col span={4} offset={4} >
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
          columns={currentSet === paidBusiness? paidColumns : tableColumns} 
          data={(filteredData.length == 0 && searchText === '') ? currentSet : filteredData}
          title={currentSet === pendingBusiness ? 'Pending Business' : currentSet === approvedBusiness? 'Approved Business' : 'Paid Business'}
        />
      <LoadingPopup
        visible={isLoading}
        title="Fetching All Business Details"
        description="Please wait while we gather all the details for you. This might take a moment."
      />
    </div>
  );
};

export default BusinessTable;



