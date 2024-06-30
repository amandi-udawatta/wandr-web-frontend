'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSideBar';

const AdminBusinesses: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Businesses'}/>
      <div className="flex-1 flex flex-col">
          <AdminHeader page={'Businesses'} />
        <div className="flex-1 overflow-y-auto">
          <h1>Businesses</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminBusinesses;
