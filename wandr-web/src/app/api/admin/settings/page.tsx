'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSideBar';

const AdminPlaces: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Settings'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Settings'} />
        
        <div className="flex-1 overflow-y-auto">
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminPlaces;
