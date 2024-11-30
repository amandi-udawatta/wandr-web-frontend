'use client';

import { useState } from "react";
import { Button } from "antd";
import { FaPaperclip, FaSmile } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { useWebSocket } from "@/services/WebSocketContext";
import {SendOutlined } from '@ant-design/icons';

const ChatInput = ({ senderId, receiverId, onSend }: { senderId: number; receiverId: number; onSend: (message: string) => void }) => {
    const [message, setMessage] = useState('');
  const { sendMessage } = useWebSocket();

  const handleSendMessage = () => {
    if (message.trim() && receiverId) {
    sendMessage({
        senderId, // Use senderId dynamically passed as a prop
        receiverId, // Use receiverId dynamically passed as a prop
        message: message.trim(),
        });
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="flex justify-between items-center p-2 w-[calc(100%-30px)]">
      <div className="flex bg-blue-50 items-center w-full space-x-2 p-2.5 rounded-md m-2 ">
        <FaPaperclip className="text-gray-500 cursor-pointer" />
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-inherit focus:outline-none text-gray-700"
        />
        <FaSmile className="text-gray-500 text-lg cursor-pointer" />
        <CiCamera className="text-gray-500 text-lg cursor-pointer" />
      </div>
      <Button
            icon={<SendOutlined className='text-white' />}
            onClick={() => handleSendMessage() }
            type="text"
            style={{ float: 'right', backgroundColor: '#609734', borderColor: '#609734' }}
        />
    </div>
  );
};

export default ChatInput;
