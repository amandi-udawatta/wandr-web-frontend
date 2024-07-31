'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import {UserBusinessProfileContent} from '@/components/business/UserBusinessProfileContent'
import BusinessSideBar from '@/components/business/UserSidebar';

const BusinessProfile: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Profile'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Profile'} />
        <div className="flex-1 overflow-y-auto">
          <UserBusinessProfileContent />
        </div>
      </div>
    </div>
  )
}

export default BusinessProfile;
