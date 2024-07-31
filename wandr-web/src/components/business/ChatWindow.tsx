import React from 'react';
import { Input, Button } from 'antd';

const ChatWindow: React.FC = () => {
  const messages = [
    { id: 1, sender: 'customer', content: 'Hello, I have a question about product X.' },
    { id: 2, sender: 'business', content: 'Sure, what do you need to know?' },
    { id: 3, sender: 'customer', content: 'Is it available in red?' },
    { id: 4, sender: 'business', content: 'Yes, it is available in red.' },
    // Add more messages as needed
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-1 overflow-auto mb-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex mb-2 p-2 rounded ${msg.sender === 'customer' ? 'bg-blue-100 justify-start' : 'bg-green-100 justify-end'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <Input className="flex-1 mr-2" placeholder="Type a message..." />
        <Button type="primary">Send</Button>
      </div>
    </div>
  );
};

export default ChatWindow;
