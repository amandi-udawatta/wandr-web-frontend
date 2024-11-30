'use client';

import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { apiService, showNotification } from '@/services/apiService';
import LoadingPopup from '@/components/general/LoadingPopup';
import {jwtDecode} from 'jwt-decode'; // Fix import
import Cookies from 'js-cookie';

interface Reservation {
    key: number;
    unitId: number;
    refNumber: string;
    travellerName: string;
    productName: string;
    quantity: number;
    totalReservationPrice: number;
    reservationDate: string;
    reservationStatus: string;
}


const ReservationsTable = () => {
  const [currentSet, setCurrentSet] = useState<Reservation[]>([]);
  const [pendingReservations, setPendingReservations] = useState<Reservation[]>([]);
  const [purchasedReservations, setPurchasedReservations] = useState<Reservation[]>([]);
  const [status, setStatus] = useState('active');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const getBusinessIdFromToken = (token: string) => {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.id; // Adjust to match your JWT structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get('accessToken');
      const businessId = token ? getBusinessIdFromToken(token) : null;

      if (!businessId) {
        showNotification('error', 'Operation Status', 'No business ID found in token');
        setIsLoading(false);
        return;
      }

      const response = await apiService.get(`/reservations/business/${businessId}`);
      if (response.success && response.data) {
        const formattedData = response.data.map((item: any, index: number) => ({
          key: index + 1,
          unitId: item.unit_id,
          refNumber: `RES00${item.unit_id}`,
          travellerName: item.travellerName,
          productName: item.productName,
          quantity: item.quantity,
          totalReservationPrice: item.totalReservationPrice,
          reservationDate: new Date(item.reservationDate).toLocaleDateString(),
          reservationStatus: item.reservationStatus,
        }));

        const active: Reservation[] = formattedData.filter((item: Reservation) => item.reservationStatus === 'Active');
        const purchased: Reservation[] = formattedData.filter((item: Reservation) => item.reservationStatus === 'Purchased');

        setPendingReservations(active);
        setPurchasedReservations(purchased);
        setCurrentSet(status === 'active' ? active : purchased);
      } else {
        showNotification('warning', 'No data', 'No reservations available.');
      }
    } catch (error) {
      showNotification('error', 'Error', 'Failed to fetch reservations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [status]);

  const handleConfirmOrder = async (unitId: number) => {
    try {
      const response = await apiService.put(`/reservations/${unitId}/status`, {
        reservationStatus: 'Purchased',
      });
  
      if (response.success) {
        // Move the reservation from pending to purchased
        setPendingReservations(prev => prev.filter(order => order.unitId !== unitId));
  
        const updatedReservation = pendingReservations.find(order => order.unitId === unitId);
        if (updatedReservation) {
          updatedReservation.reservationStatus = 'Purchased';
          setPurchasedReservations(prev => [...prev, updatedReservation]);
        }
  
        // Update the current set to reflect the current tab's state
        if (status === 'active') {
          setCurrentSet(prev => prev.filter(order => order.unitId !== unitId));
        } else {
          setCurrentSet(prev => [...prev, updatedReservation!]);
        }
  
        showNotification(
          'success',
          'Operation Status',
          response.message || 'Reservation status updated successfully'
        );
      } else {
        throw new Error(response.message || 'Failed to update reservation status');
      }
    } catch (error) {
      showNotification(
        'error',
        'Operation Status',
        (error as Error).message || 'Error updating reservation status'
      );
    }
  };

  const columns = [
    { title: '#', dataIndex: 'key', key: 'key' },
    { title: 'Ref Number', dataIndex: 'refNumber', key: 'refNumber' },
    { title: 'Traveller Name', dataIndex: 'travellerName', key: 'travellerName' },
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Total Reservation Price', dataIndex: 'totalReservationPrice', key: 'totalReservationPrice' },
    { title: 'Reservation Date', dataIndex: 'reservationDate', key: 'reservationDate' },
    {
      title: 'Status',
      dataIndex: 'reservationStatus',
      key: 'reservationStatus',
      render: (text: string) => (
        <span className={text === 'Purchased' ? 'text-green-500' : 'text-yellow-500'}>
          {text}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleConfirmOrder(record.unitId)}
          className="bg-green-50"
          disabled={record.reservationStatus === 'Purchased'}
        >
          Confirm Collected
        </Button>
      ),
    },
  ];

  const filteredData = currentSet.filter(item =>
    item.refNumber.toLowerCase().includes(searchText.toLowerCase()) ||
    item.travellerName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-4 gap-4 m-3">
      <Row align={'middle'} gutter={8}>
        <Col span={4}>
          <Button
            type={status === 'active' ? 'primary' : 'default'}
            onClick={() => setStatus('active')}
            style={{
                marginLeft: 8,
                backgroundColor: status === 'active' ? '#609734' : undefined,
                borderColor: status === 'active' ? '#609734' : undefined,
            }}
          >
            Pending Reservations
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type={status === 'purchased' ? 'primary' : 'default'}
            onClick={() => setStatus('purchased')}
            style={{
                marginLeft: 8,
                backgroundColor: status === 'purchased' ? '#609734' : undefined,
                borderColor: status === 'purchased' ? '#609734' : undefined,
            }}
          >
            Purchased Reservations
          </Button>
        </Col>
        <Col span={8} offset={6}>
          <Input
            placeholder="Search by Reference Number or Product Name or Traveller Name..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width:'512px', height:'40px' }}
            prefix={<SearchOutlined style={{color:'#609734'}}/>}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} />
      <LoadingPopup
        visible={isLoading}
        title="Loading Reservations"
        description="Please wait while we load the reservations."
      />
    </div>
  );
};

export default ReservationsTable;
