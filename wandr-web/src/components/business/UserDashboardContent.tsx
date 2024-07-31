

import React from 'react';
import {Row, Col, Button} from 'antd';
import { ShoppingOutlined, InboxOutlined, UserAddOutlined, DownCircleOutlined } from '@ant-design/icons';

import StatCard from "@/components/business/StatisticCard";
import {ArrowDownFromLine, DownloadIcon} from "lucide-react";
import BarChart from "@/components/business/BarChart";

const statistics = [
  { title: 'Total Revenue', value: "RS.198K", color: 'bg-red-100', icon: <ArrowDownFromLine  style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#f71678' },
  { title: 'Total Reservations', value: "22", color: 'bg-yellow-100', icon: <ShoppingOutlined  style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#fcbf43' },
  { title: 'Totals Ads', value: "15", color: 'bg-green-100', icon: <InboxOutlined  style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#4feb4b' },
  { title: 'Total Contacts', value: "8", color: 'bg-purple-100', icon: <UserAddOutlined  style={{ fontSize: '24px' }} className='white-icon' />, bgColor: '#8f2df0' },
];
const totalRevenueData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Online Sales',
      data: [12, 19, 3, 5, 2, 3, 10],
      backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light pastel blue
      borderColor: 'rgba(173, 216, 230, 1)',
      borderWidth: 1,
    },
    {
      label: 'Offline Sales',
      data: [5, 15, 6, 8, 3, 7, 13],
      backgroundColor: 'rgba(144, 238, 144, 0.5)', // Light pastel green
      borderColor: 'rgba(144, 238, 144, 1)',
      borderWidth: 1,
    },
  ],
};

const totalRevenueOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
    title: {
      display: false,
      text: 'Total Revenue',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      // display: false,
      grid: {
        display: true,
      },
    },
  }
};
const targetVsRealityData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Reality Sales',
      data: [8.823, 9.231, 10.123, 11.456, 12.789, 14.012, 15.678],
      backgroundColor: 'rgba(255, 182, 193, 0.6)', // Light pastel pink
      borderColor: 'rgba(255, 182, 193, 1)',
      borderWidth: 1,
      radius: 10,
      borderRadius: 5
    },
    {
      label: 'Target Sales',
      data: [12.122, 13.456, 14.789, 16.123, 17.456, 18.789, 20.123],
      backgroundColor: 'rgba(135, 206, 250, 0.6)', // Light pastel blue
      borderColor: 'rgba(135, 206, 250, 1)',
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};


const targetVsRealityOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Target vs Reality',
    },


  },
  scales: {
    x: {
      borderWidth: 0,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  }
};

const Dashboard = () => {




  return (
    <div className="p-4 gap-4 m-3">
      <Row gutter={16}>
        <Col span={24}>
          <div className='gap-3 border border-gray-200 rounded-xl p-5'>
            <Row justify="space-between" align="top">
              <Col span={8}>
                <h1 className="text-xl font-bold h-full mb-3 mt-3 my-text">Application Statistics</h1>
                <p className="text-gray-700 text-sm mt-2 mb-8 my-text">
                  Total Statistics Summary
                </p>
              </Col>
              {/* <Col  >
                <Button type="default" className="rounded" icon={<DownloadIcon/>}>Export</Button>
              </Col> */}
            </Row>
            <Row justify='space-around'>
              {statistics.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </Row>
          </div>
        </Col>

      </Row>
      <Row  className='mt-5' justify='space-between' gutter={16}>
        <Col span={15}>
          <div className='gap-3 border border-gray-200 rounded-xl p-5'>
            <h1 className="text-xl font-bold  mb-3 mt-3 my-text">Total Revenue</h1>
            <BarChart data={totalRevenueData} options={totalRevenueOptions} />
          </div>
        </Col>
        <Col span={8}>
          <div className='gap-3 border border-gray-200 rounded-xl p-5'>
            <h1 className="text-xl font-bold h-[210px] mb-3 mt-3 my-text">Target vs Reality</h1>
            <BarChart data={targetVsRealityData} options={targetVsRealityOptions}/>
          </div>
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;
