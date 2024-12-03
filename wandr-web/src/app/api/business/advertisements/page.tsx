'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessSideBar from '@/components/business/UserSidebar';
import { AdvertisementContent } from '@/components/business/advertisements/AdvertisementContent';
import withAuth from '@/services/authenticationService';

const BusinessaAdvertisements: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Advertisements'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Advertisements'} />
        <div className="flex-1 overflow-y-auto">
          <AdvertisementContent />
        </div>
      </div>
    </div>
  )
}

export default withAuth(BusinessaAdvertisements, "BUSINESS");
