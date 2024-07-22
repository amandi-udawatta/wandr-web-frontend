// pages/dashboard.js or wherever your dashboard is located

import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import {Tag, Progress} from 'antd';
import {ArrowDownOutlined,ShopOutlined,ProductOutlined,CrownOutlined,CarOutlined } from '@ant-design/icons';
import StatisticCard from '@/components/admin/StatisticBar';
import TableCard from '@/components/admin/TableCard';
import BarChart from '@/components/charts/revenueBarChart';
import ChartCard from '@/components/admin/ChartCard';
import PieChart from '@/components/charts/countryPieChart';
import { apiService, showNotification } from '@/services/apiService';
import LoadingPopup from '@/components/general/LoadingPopup';


const initialStatistics = [
  { title: 'Total Businesses', value: 0, color: 'bg-green-100', icon: <ShopOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#3CD856' },
  { title: 'Products Reserved', value: 0, color: 'bg-yellow-100', icon: <ProductOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FF947A' },
  { title: 'Total Downloads', value: 0, color: 'bg-pink-100', icon: <ArrowDownOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FA5A7D' },
  { title: 'Premium Accounts', value: 0, color: 'bg-blue-100', icon: <CrownOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#3c70d8' },
  { title: 'Total Trips Planned', value: 0, color: 'bg-purple-100', icon: <CarOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#BF83FF' },
];

const tableColumns = [
  { title: '#', dataIndex: 'number', key: 'number' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Popularity',
    dataIndex: 'popularity',
    key: 'popularity',
    render: (text: string) => (
      <Progress percent={parseFloat(text)} size="small" className='my-text' strokeColor='#609734' />
    ),
  },
  {
    title: 'Sales',
    dataIndex: 'sales',
    key: 'sales',
    render: (text: number) => (
      <Tag color="#609734" className='my-text'>{text}</Tag>
    ),
  },
];

const Dashboard = () => {

  const [statistics, setStatistics] = useState(initialStatistics);
  const [tableData, setTableData] = useState([]);
  const [revenueData, setRevenueData] = useState({ labels: [] as string[], values: [] as any[], title: 'Total Revenue' });
  const [userData, setUserData] = useState({ labels: [] as string[], values: [] as any[], title: 'User Mapping by Country' });

  const [isLoading, setIsLoading] = useState(false);

  let loadingStatistics = false;
  let loadingCountries = false;
  let loadingShops = false;
  let loadingRevenue = false;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
          const response = await apiService.get('/statistics/dashboard');
          console.log('Fetch response:', response);

          if (response.success) {
            const updatedStatistics = initialStatistics.map(stat => {
              switch (stat.title) {
                case 'Total Businesses':
                  return { ...stat, value: response.data.totalBusinesses };
                case 'Products Reserved':
                  return { ...stat, value: response.data.totalReservations };
                case 'Total Downloads':
                  return { ...stat, value: response.data.totalAppDownloads };
                case 'Premium Accounts':
                  return { ...stat, value: response.data.premiumAccounts };
                case 'Total Trips Planned':
                  return { ...stat, value: response.data.totalTrips };
                default:
                  return stat;
              }
            });

            setStatistics(updatedStatistics);
            // showNotification('success', 'Operation Status', response.message || 'Successfully Fetched All Details');
            console.log(updatedStatistics);

          } else {
            throw new Error(response.message || 'Failed to fetch statistics');
          }
        } catch (error) {
          showNotification('error', 'Operation Status', 'Error Fetching All Details');
        }
      finally {
        loadingStatistics = true;
        if(loadingStatistics && loadingShops && loadingRevenue && loadingCountries) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPopularStores = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/business/popular-stores');
        console.log('Fetch response:', response);

        if (response.success) {
          const updatedTableData = response.data.map((store:any, index:any) => ({
            key: (index + 1).toString(),
            number: (index + 1).toString(),
            name: store.shopName,
            popularity: `${store.popularity}%`,
            sales: store.salesCount,
          }));
          setTableData(updatedTableData);
        } else {
          throw new Error(response.message || 'Failed to fetch popular stores');
        }
      } catch (error) {
        console.error('Error fetching popular stores:', error);
      } finally {
        loadingShops = true;
        if(loadingStatistics && loadingShops && loadingRevenue && loadingCountries) {
          setIsLoading(false);
        }
      }
    };

    fetchPopularStores();
  }, []);

  useEffect(() => {
    const fetchRevenueData = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/statistics/total-revenue');
        console.log('Fetch response:', response);

        if (response.success) {
          const updatedRevenueData = {
            labels: ['Premium Accounts', 'Business Plan', 'Reservation Commissions'],
            values: [
              response.data.premiumRevenue,
              response.data.businessPlanRevenue,
              response.data.reservationRevenue,
            ],
            title: 'Total Revenue',
          };
          setRevenueData(updatedRevenueData);
        } else {
          throw new Error(response.message || 'Failed to fetch revenue data');
        }
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        loadingRevenue = true;
        if(loadingStatistics && loadingShops && loadingRevenue && loadingCountries) {
          setIsLoading(false);
        }
      }
    };

    fetchRevenueData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/statistics/user-country');
        console.log('Fetch response:', response);
  
        if (response.success) {
          // Transform the data from the API response
          const updatedUserData = {
            labels: response.data.map((entry:any) => entry.country),
            values: response.data.map((entry:any) => entry.userCount),
            title: 'User Mapping by Country',
          };
          setUserData(updatedUserData);
        } else {
          throw new Error(response.message || 'Failed to fetch user country data');
        }
      } catch (error) {
        console.error('Error fetching user country data:', error);
      } finally {
        loadingCountries = true;
        if(loadingStatistics && loadingShops && loadingRevenue && loadingCountries) {
          setIsLoading(false);
          showNotification('success', 'Operation Status', 'Successfully Fetched All Details');
        }
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="p-4 gap-4 m-3">
      <Row gutter={16}>
        <Col span={24}>
          <div className='gap-4 border border-gray-200 rounded-xl p-5'>
            <Row justify="center" align="top">
              <Col span={21}>
                <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">Application Statistics</h1>
                <p className="text-gray-700 text-sm mt-2 mb-8 my-text">
                  Total Statistics Summary
                </p>
              </Col>
              <Col span={3}>
                {/* <Button
                  type="submit"
                  title="Export"
                  variant="btn_white_border"
                  height="h-btn-sm"
                  rounded="rounded-lg"
                /> */}
              </Col>
            </Row>
            <Row justify='space-around'>
              {statistics.map((stat, index) => (
                <StatisticCard key={index} {...stat} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      <Row className='mt-5' justify='space-between' gutter={16}>
        <Col span={10}>
          <div className='flex flex-col'>
            <TableCard columns={tableColumns} data={tableData} title="Top Businesses" />
          </div>
        </Col>
        <Col span={14}>
          <div className="">
            <BarChart data={revenueData} />
          </div>
        </Col>
      </Row>
      <Row className='mt-5' justify='space-between' gutter={16}>
        <Col span={9}>
          <div className="">
            <PieChart data={userData} />
          </div>
        </Col>
      </Row>
      <LoadingPopup
        visible={isLoading}
        title="Fetching All Places"
        description="Please wait while we gather all the details for you. This might take a moment."
      />
    </div>
  );
};

export default Dashboard;
