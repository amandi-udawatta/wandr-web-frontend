'use client';

import React from 'react';
import BusinessHeader from '@/components/business/UserHeader';
import BusinessSideBar from '@/components/business/UserSidebar';
import { ChatContent } from '@/components/business/chat/ChatContent';
import { WebSocketProvider } from '@/services/WebSocketContextService';
import withAuth from '@/services/authenticationService';

const BusinesChat: React.FC = () => {
  return (
    <WebSocketProvider> {/* Wrap the entire page in WebSocketProvider */}
      <div className="flex h-screen">
        <BusinessSideBar active={'Chat'} />
        <div className="flex-1 flex flex-col">
          <BusinessHeader page={'Chat'} />
          <div className="h-screen">
            <div className="border-r">
              <ChatContent />
            </div>
          </div>
        </div>
      </div>
    </WebSocketProvider>
  );
};

export default withAuth(BusinesChat, 'BUSINESS');
