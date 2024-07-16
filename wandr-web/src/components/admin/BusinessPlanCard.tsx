'use client';

import React from 'react'
import { BulbTwoTone, CrownTwoTone, DeleteOutlined, EditOutlined, EllipsisOutlined, FireTwoTone, HeartTwoTone, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';

const { Meta } = Card;

interface BusinessCardProps {
  title: string
  description: string
  features: string[]
  price: number
  onEdit: () => void
  onDelete: () => void
}

const getIconByTitle = (title: string): React.ReactNode => {
    switch (title) {
      case 'Basic Plan':
        return <BulbTwoTone style={{ fontSize: '52px' }} twoToneColor="#cd7f32" />;
      case 'Standard Plan':
        return <FireTwoTone style={{ fontSize: '52px' }} twoToneColor="#C0C0C0" />;
      case 'Premium Plan':
        return <CrownTwoTone style={{ fontSize: '52px' }} twoToneColor="#FFD700" />;
      default:
        return <HeartTwoTone style={{ fontSize: '52px' }} twoToneColor="#cd7f32" />;
    }
  };

const BusinessPlanCard: React.FC<BusinessCardProps> = ({title, description, features, price, onEdit, onDelete }) => {
  return (
    <Card className="max-w-sm mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
            <div className=" w-full">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-500">{description}</p>
            </div>
            <div className="flex gap-2">
            <Button 
                type="text" 
                icon={<EditOutlined />} 
                onClick={onEdit} 
                className="text-black"
            />
            <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                onClick={onDelete} 
                className="text-red-600"
            />
            </div>
        </div>
        <div className="mt-4">
            <div className='w-full h-32 justify-center align-middle flex '>
                {getIconByTitle(title)}
            </div>
            <ul className="list-disc list-inside text-left mt-4">
            {features.map((feature, index) => (
                <li key={index}>{feature}</li>
            ))}
            </ul>
            <p className="text-2xl font-bold mt-5">Rs. {price}.00</p>
        </div>
    </Card>
  )
}

export default BusinessPlanCard;