'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSideBar';
import BusinessTable from '@/components/admin/BusinessTable';
import withAuth from '@/services/authenticationService';

const AdminPlaces: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Businesses'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Businesses'} />
        
        <div className="flex-1 overflow-y-auto">
          <BusinessTable />
        </div>
      </div>
    </div>
  )
}

export default withAuth(AdminPlaces, "ADMIN");
