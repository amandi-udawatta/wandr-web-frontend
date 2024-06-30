'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSideBar';

const AdminBusinessPlans: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Business Plans'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Business Plans'} />
      <div className="flex-1 overflow-y-auto">
          <h1>Business Plans</h1>
        </div>
      </div>
    </div>
  )
}

export default AdminBusinessPlans;
