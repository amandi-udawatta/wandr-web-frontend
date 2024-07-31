import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {SIDEBAR_ITEMS, BUSINESS_SIDEBAR_ITEMS} from '@/constants';


interface UserSidebarProps{
  active: string;
}

const UserSidebar: React.FC<UserSidebarProps> = ({active}) => {
  return (
    <aside className="h-full bg-white shadow-md">
      <div className='flex justify-center align-middle mt-5 mb-10'>
        <Image src='/logo.png' alt="logo" width={150} height={19} />
      </div>
      <nav className='text-green-50 px-2'>
        <ul className="space-y-4">
          {BUSINESS_SIDEBAR_ITEMS.map((link) => (
              <Link href={link.href} key={link.key}
              className={` custom-list-item  ${active === link.label? 'bg-green-50 text-white border rounded-xl' : ''}`}>
                  <link.icon />
                  {link.label}
              </Link>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default UserSidebar;
