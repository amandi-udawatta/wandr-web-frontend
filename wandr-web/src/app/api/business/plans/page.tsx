'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessSideBar from '@/components/business/UserSidebar';
import PayHerePayment from '@/components/general/Payment';

const BusinesChat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Plans'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Plans'} />
        <div className="flex-1 overflow-y-auto">
          <PayHerePayment 
            amount={100} 
            orderId="12345" 
            customerName="John Doe" 
            email="john.doe@example.com" 
            phone="123-456-7890" 
          />
        </div>
      </div>
    </div>
  )
}

export default BusinesChat;
