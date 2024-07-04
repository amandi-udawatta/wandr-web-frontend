// pages/dashboard.js or wherever your dashboard is located

import React from 'react';
import { Row, Col } from 'antd';
import {Tag, Progress} from 'antd';
import {ArrowDownOutlined,ShopOutlined,ProductOutlined,CrownOutlined} from '@ant-design/icons';
import StatisticCard from '@/components/admin/StatisticBar';
import TableCard from '@/components/admin/TableCard';
import ChartCard from '@/components/admin/ChartCard';
import PieChart from '@/components/charts/countryPieChart';

const statistics = [
  { title: 'Total Downloads', value: 15, color: 'bg-pink-100', icon: <ArrowDownOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FA5A7D' },
  { title: 'Total Businesses', value: 22, color: 'bg-yellow-100', icon: <ShopOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#FF947A' },
  { title: 'Products Reserved', value: 198, color: 'bg-green-100', icon: <ProductOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#3CD856' },
  { title: 'Premium Accounts', value: 8, color: 'bg-purple-100', icon: <CrownOutlined style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#BF83FF' },
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

const tableData = [
  { key: '1', number: '1', name: 'Rathna Jewellery', popularity: '45%', sales: 300 },
  { key: '2', number: '2', name: 'Elephant Craft Store', popularity: '25%', sales: 200 },
  { key: '3', number: '3', name: 'Elephant Craft Store', popularity: '25%', sales: 200 },
];

const Dashboard = () => {
  const userData = {
    labels: ['USA', 'Canada', 'UK', 'Germany', 'France', 'Australia'],
    values: [300, 50, 100, 75, 60, 40],
    title: 'User Mapping by Country',
  };

  return (
    <div className="p-4 gap-4 m-3">
      <Row gutter={16}>
        <Col span={16}>
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
        <Col span={8}>
          <div className="">
            <ChartCard title='Visitor Insights' />
          </div>
        </Col>
      </Row>
      <Row className='mt-5' justify='space-between' gutter={16}>
        <Col span={10}>
          <div className='flex flex-col'>
            <TableCard columns={tableColumns} data={tableData} title="Top Businesses" />
          </div>
        </Col>
        <Col span={7}>
          <div className="">
            <PieChart data={userData} />
          </div>
        </Col>
        <Col span={7}>
          <div className="">
            <ChartCard title='Total Revenue' />
          </div>
        </Col>
      </Row>
      <Row className='mt-5' justify='space-between' gutter={16}>
        <Col span={10}>
          <div className="">
            <ChartCard title='User Mapping by Country' />
          </div>
        </Col>
        <Col span={7}>
          <div className="">
            <ChartCard title='User Mapping by Country' />
          </div>
        </Col>
        <Col span={7}>
          <div className="">
            <ChartCard title='Total Revenue' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
