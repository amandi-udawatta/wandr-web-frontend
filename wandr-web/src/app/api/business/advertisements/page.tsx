'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import {UserAdvertisementContent} from '@/components/business/UserAdvertisementContent'
import BusinessSideBar from '@/components/business/UserSidebar';

const BusinessaAdvertisements: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Advertisements'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Advertisements'} />
        <div className="flex-1 overflow-y-auto">
          <UserAdvertisementContent />
        </div>
      </div>
    </div>
  )
}

export default BusinessaAdvertisements;
