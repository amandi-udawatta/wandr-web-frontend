'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessSideBar from '@/components/business/UserSidebar';
import ReservationsTable from '@/components/business/reservations/ReservationTable';
import withAuth from '@/services/authenticationService';

const BusinesChat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Reservations'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Reservations'} />
        <div className="flex-1 overflow-y-auto">
          <ReservationsTable/>
        </div>
      </div>
    </div>
  )
}

export default withAuth(BusinesChat, "BUSINESS");
