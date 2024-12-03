'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessSideBar from '@/components/business/UserSidebar';
import PayHerePayment from '@/components/general/Payment';
import withAuth from '@/services/authenticationService';

const BusinesChat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Plans'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Plans'} />
        <div className="flex-1 overflow-y-auto">
          <PayHerePayment />
        </div>
      </div>
    </div>
  )
}

export default withAuth(BusinesChat, 'BUSINESS');
