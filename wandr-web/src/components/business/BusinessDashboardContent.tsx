import React from 'react';
import {Row, Col, Button, Progress, Tag, Avatar} from 'antd';
import { ShoppingOutlined, DollarOutlined, SmileOutlined, FrownOutlined, CalendarOutlined } from '@ant-design/icons';
import StatisticCard from '@/components/admin/StatisticBar';
import PieChart from '@/components/charts/countryPieChart';
import BarChart from '@/components/charts/revenueBarChart';
import AdvertisementCarousel from './BusinessAdCarousel';
import TableCard from '../admin/TableCard';

const initialStatistics = [
  { title: 'Products Reserved', value: 125, color: 'bg-blue-100', icon: <ShoppingOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#3c70d8' },
  { title: 'Total Revenue', value: 'Rs. 19,500', color: 'bg-yellow-100', icon: <DollarOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FF947A' },
  { title: 'Positive Feedbacks', value: 25, color: 'bg-green-100', icon: <SmileOutlined  style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#3CD856' },
  { title: 'Negative Feedbacks', value: 2, color: 'bg-red-100', icon: <FrownOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FA5A7D' },
  { title: 'Remaining Days in Plan', value: 13, color: 'bg-purple-100', icon: <CalendarOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#BF83FF' },
];

const pieChartData = {
  labels: ['USA', 'Canada', 'UK', 'Germany', 'Australia', 'India'],
  values: [150, 120, 100, 80, 60, 50],
  title: 'User Reservations by Country',
};

const advertisements = [
  {
    image: '/advertisement1.jpg',
    title: 'Summer Sale',
    remainingDays: 5,
  },
  {
    image: '/advertisement2.jpeg',
    title: 'New Arrivals',
    remainingDays: 3,
  },
  {
    image: '/advertisement3.jpg',
    title: 'Clearance Sale',
    remainingDays: 10,
  },
];

const monthlyRevenueData = {
  labels: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  values: [
    1200, 1500, 1800, 1700, 1600, 2000,
    1900, 2100, 2200, 2300, 2500, 2400
  ],
  title: 'Monthly Revenue for the Year 2024'
};


const tableColumns = [
  { title: '#', dataIndex: 'number', key: 'number' },
  { title: 'Name',
    dataIndex: 'name', 
    key: 'name',
    render: (text: string, record: any) => (
      <div className="flex items-center">
        <Avatar src={record.imageUrl} alt={text} style={{ marginRight: 8 }} />
        {text}
      </div>
    ),
  },

  {
    title: 'Sales',
    dataIndex: 'sales',
    key: 'sales',
    // render: (text: number) => (
    //   <Tag color="#609734" className='my-text'>{text}</Tag>
    // ),
    // render: (text: string) => (
    //   <Progress percent={parseFloat(text)} size="small" className='my-text' strokeColor='#609734' />
    // ),
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'revenue',
    render: (text: number) => (
      <Tag color="#609734" className='my-text'>{text}</Tag>
    ),
  },
];

const data = [
  {
    number: '1',
    name: 'Product A',
    imageUrl: '/businessImage1.jpg',
    sales: '150',
    revenue: 'Rs. 8,300',
  },
  {
    number: '2',
    name: 'Product B',
    imageUrl: '/businessImage2.jpg',
    sales: '120',
    revenue: 'Rs. 6,400',
  },
  {
    number: '3',
    name: 'Product C',
    imageUrl: '/businessImage3.jpg',
    sales: '100',
    revenue: 'Rs. 5,700',
  },
  {
    number: '4',
    name: 'Product D',
    imageUrl: '/businessImage4.jpg',
    sales: '100',
    revenue: 'Rs. 3,500',
  },
  {
    number: '5',
    name: 'Product E',
    imageUrl: '/businessImage5.jpeg',
    sales: '100',
    revenue: 'Rs. 1,420',
  },
];


const Dashboard = () => {

  return (
    <div className="p-4 gap-4 m-3">
      <Row gutter={16}>
        <Col span={24}>
          <div className='gap-4 border border-gray-200 rounded-xl p-5'>
            <Row justify="center" align="top">
              <Col span={21}>
                <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">Your Business Statistics</h1>
                <p className="text-gray-700 text-sm mt-2 mb-8 my-text">
                  Monthly Statistics Summary (From July 01st  to August 01st)
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
              {initialStatistics.map((stat, index) => (
                <StatisticCard key={index} {...stat} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      <Row  className='mt-5' justify='space-between' gutter={16}>
        <Col span={17}>
          <div className=''>
            <TableCard columns={tableColumns} data={data} title="Top 3 Products" pagination={false}/>
          </div>
        </Col>
        <Col span={7} className=''>
          <div className='justify-center'>
            <AdvertisementCarousel advertisements={advertisements} />
          </div>
        </Col>
      </Row>
      <Row className='mt-5' justify='space-between' gutter={16}>
        <Col span={9}>
          <div className="">
            <PieChart data={pieChartData} />
          </div>
        </Col>
        <Col span={15}>
          <div className="">
            <BarChart data={monthlyRevenueData}/>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;
