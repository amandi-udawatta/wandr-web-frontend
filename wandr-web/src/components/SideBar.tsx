import React from 'react';
import Image from "next/image";

interface SidebarItem {
  title: string;
  icon: React.FC;
  isActive: boolean;
  onClick: () => void;
}

interface AdminSidebarProps {
  logoSrc: string;
  items: SidebarItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ logoSrc, items }) => {
  return (
    <aside className="h-full bg-white shadow-md">
      <div className='flex justify-center align-middle my-5'>
        <Image src={logoSrc} alt="logo" width={150} height={19} />
      </div>
      <nav className='text-green-50 px-2'>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={`custom-list-item ${item.isActive ? 'bg-green-50 text-white border rounded-xl' : ''}`}
              onClick={item.onClick}
            >
              <item.icon />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default AdminSidebar;
