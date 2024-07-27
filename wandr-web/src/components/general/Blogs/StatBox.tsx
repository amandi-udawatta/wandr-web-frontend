import React from 'react';
import { FileTextOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons';

interface StatBoxProps {
    title: string;
    icon: React.ReactNode;
    number: number;
}

const StatBox: React.FC<StatBoxProps> = ({ title, icon, number }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-center text-4xl text-blue-500 mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-2xl font-bold">{number}</p>
        </div>
    );
};

export default StatBox;
