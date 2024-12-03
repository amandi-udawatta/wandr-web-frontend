'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import {UserBusinessProfileContent} from '@/components/business/UserBusinessProfileContent'
import BusinessSideBar from '@/components/business/UserSidebar';
import { UserBusinessProfileEditContent } from '@/components/business/UserBusinessProfileEditContent';
import ProfilePageComponent from '@/components/business/profile/ProfileDetailsPage';
import withAuth from '@/services/authenticationService';

const BusinessProfile: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Profile'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Profile'} />
        <div className="flex-1 overflow-y-auto">
          <ProfilePageComponent />
        </div>
      </div>
    </div>
  )
}

export default withAuth(BusinessProfile, "BUSINESS");
