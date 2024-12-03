'use client';

import React, { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader'
import AdminDashboardContent from '@/components/admin/AdminDashboardContent'
import AdminSidebar from '@/components/admin/AdminSideBar';
import withAuth from '@/services/authenticationService';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Dashboard'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Dashboard'} />
        <div className="flex-1 overflow-y-auto">
          <AdminDashboardContent />
        </div>
      </div>
    </div>
  )
}

export default withAuth(AdminDashboard,"ADMIN");
