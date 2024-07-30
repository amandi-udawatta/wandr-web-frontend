import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { SIDEBAR_ITEMS } from '@/constants';
import { LogoutOutlined } from '@ant-design/icons';
import { apiService } from '@/services/apiService';
import {jwtDecode} from 'jwt-decode';// make sure this points to your API service setup
import Cookies from 'js-cookie'; // install js-cookie with npm install js-cookie


interface AdminSidebarProps{
  active: string;
}

//TODO: connect with backend
const logout = async () => {
  try {
    const token = Cookies.get('accessToken');

    if (!token) {
      console.log('No access token found');
      return;
    }

    const decodedToken = jwtDecode(token);
    const { id, role } = decodedToken as { id: string, role: string };

    console.log(decodedToken);
    console.log(id);
    console.log(role);

    // const response = await apiService.post('/logout', {
    //   id, role
    // });

    // if (response.ok) {
      Cookies.remove('accessToken');
      window.location.href = '/api/admin/login';
    // } else {
    //   console.log('Failed to sign out');
    // }
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
};


const AdminSidebar: React.FC<AdminSidebarProps> = ({active}) => {
  return (
    <aside className="h-full bg-white shadow-md">
      <div className='flex justify-center align-middle mt-5 mb-10'>
        <Image src='/logo.png' alt="logo" width={150} height={19} />
      </div>
      <nav className='text-green-50 px-2'>
        <ul className="space-y-4">
          {SIDEBAR_ITEMS.map((link) => (
              <Link href={link.href} key={link.key}
              className={` custom-list-item  ${active === link.label? 'bg-green-50 text-white border rounded-xl' : ''}`}>
                  <link.icon />
                  {link.label}
              </Link>
          ))}
          <div onClick={logout}
            className={` custom-list-item  ${active === 'Sign Out'? 'bg-green-50 text-white border rounded-xl' : ''}`}>
                <LogoutOutlined />
                Sign Out
          </div>
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar;
