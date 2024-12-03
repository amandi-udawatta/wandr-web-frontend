'use client';

import AdminHeader from '@/components/admin/AdminHeader'
import AdminSidebar from '@/components/admin/AdminSideBar';
import PlacesTable from '@/components/admin/PlacesTable';
import withAuth from '@/services/authenticationService';
import Cookies from 'js-cookie';


const AdminPlaces: React.FC = () => {

  return (
    <div className="flex h-screen">
      <AdminSidebar active={'Places Management'}/>
      <div className="flex-1 flex flex-col">
        <AdminHeader page={'Places Management'} />
        <div className="flex-1 overflow-y-auto">
          <PlacesTable />
        </div>
      </div>
    </div>
  )
}

export default withAuth(AdminPlaces, "ADMIN");
