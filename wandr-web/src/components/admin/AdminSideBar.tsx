'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/SideBar';
import {
  PieChartFilled,
  EnvironmentFilled,
  FundFilled,
  ShopFilled,
  SafetyCertificateFilled,
  SettingFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Dashboard');

  const sidebarItems = [
    { title: 'Dashboard', icon: PieChartFilled, path: '/dashboard', isActive: activeItem === 'Dashboard' },
    { title: 'Places Management', icon: EnvironmentFilled, path: '/places-management', isActive: activeItem === 'Places Management' },
    { title: 'Businesses', icon: ShopFilled, path: '/businesses', isActive: activeItem === 'Businesses' },
    { title: 'Advertisements', icon: FundFilled, path: '/advertisements', isActive: activeItem === 'Advertisements' },
    { title: 'Business Plans', icon: SafetyCertificateFilled, path: '/business-plans', isActive: activeItem === 'Business Plans' },
    { title: 'Settings', icon: SettingFilled, path: '/settings', isActive: activeItem === 'Settings' },
    { title: 'Sign Out', icon: CloseCircleFilled, path: '/sign-out', isActive: activeItem === 'Sign Out' },
  ];

  return (
    <div className="flex">
      <Sidebar logoSrc="/logo.png" items={sidebarItems} />
    </div>
  );
};

export default App;
