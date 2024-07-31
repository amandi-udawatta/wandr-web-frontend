'use client';

import React, { useState } from 'react';
import BusinessHeader from '@/components/business/UserHeader'
import BusinessSideBar from '@/components/business/UserSidebar';
import ChatList from '@/components/business/ChatList';
import ChatWindow from '@/components/business/ChatWindow';

const BusinesChat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <BusinessSideBar active={'Chat'}/>
      <div className="flex-1 flex flex-col">
        <BusinessHeader page={'Chat'} />
        <div className='m-5'>
            <h1>
                Chat Page
            </h1>
        </div>
        {/* <div className="flex h-screen m-16 border border-green-50 rounded-xl">
            <div className="w-1/3 border-r">
                <ChatList />
            </div>
            <div className="w-2/3">
                <ChatWindow />
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default BusinesChat;
