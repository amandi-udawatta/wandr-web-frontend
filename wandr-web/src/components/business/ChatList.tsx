import React from 'react';
import { List } from 'antd';

const ChatList: React.FC = () => {
  const chats = [
    { id: 1, name: 'Emily', lastMessage: 'Hello, I have a question about product X.' },
    { id: 2, name: 'Asanka', lastMessage: 'Can you help me with service Y?' },
    // Add more chats as needed
  ];

  return (
    <div className="h-full border-r p-4">
      <List
        itemLayout="horizontal"
        dataSource={chats}
        renderItem={chat => (
          <List.Item>
            <List.Item.Meta
              title={chat.name}
              description={chat.lastMessage}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatList;
