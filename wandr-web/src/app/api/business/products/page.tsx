'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessProductsTable from '@/components/business/ProductTable'
import BusinessSideBar from '@/components/business/UserSidebar';

const BusinessProducts: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Products'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Products'} />
        <div className="flex-1 overflow-y-auto">
          <BusinessProductsTable />
        </div>
      </div>
    </div>
  )
}

export default BusinessProducts;
