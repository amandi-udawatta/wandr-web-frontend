import React from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';

interface StatisticCardProps {
  title: string
  value: string
  color: string
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatisticCardProps> = ({ title, value, color, icon, bgColor }) => {
  return (
    <div className={`p-5 rounded-lg ${color} relative w-[180px]` }>
      <div className="absolute top-2 right-2">
        <div style={{backgroundColor: bgColor, color: 'white'}} className={`border rounded-full p-2 border-none mr-2 mt-2`}>
          {icon}
        </div>
      </div>
      <div className="text-4xl font-bold mt-16 mb-1">{value}</div>
      <div className="text-lg  font-semibold my-text">{title}</div>
    </div>
  )
}

export default StatCard;
