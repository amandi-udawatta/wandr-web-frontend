'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessDashboardContent from '@/components/business/BusinessDashboardContent'
import BusinessSideBar from '@/components/business/UserSidebar';

const BusinessDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Dashboard'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Dashboard'} />
        <div className="flex-1 overflow-y-auto">
          <BusinessDashboardContent />
        </div>
      </div>
    </div>
  )
}

export default BusinessDashboard;
