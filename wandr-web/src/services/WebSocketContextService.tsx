'use client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';

const WebSocketContext = createContext<any>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useRef<Client | null>(null);
  const [messages, setMessages] = useState<any[]>([]); // Store incoming messages
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket client
    client.current = new Client({
      brokerURL: 'ws://localhost:8080/ws', // WebSocket endpoint from backend
      connectHeaders: {},
      onConnect: () => {
        console.log('Connected to WebSocket');
        setConnected(true);

        // Subscribe to /topic/messages for incoming messages
        client.current?.subscribe('/topic/messages', (message: Message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);
          setMessages((prev) => [...prev, receivedMessage]); // Append new message
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        setConnected(false);
      },
      debug: (str) => console.log(str),
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  const sendMessage = (message: any) => {
    if (connected) {
      client.current?.publish({
        destination: '/app/chat', // Backend endpoint
        body: JSON.stringify(message),
      });
    } else {
      console.error('WebSocket is not connected. Unable to send message.');
    }
  };

  const subscribe = (destination: string, callback: (message: any) => void) => {
    if (client.current && connected) {
      client.current.subscribe(destination, (message: Message) => {
        const parsedMessage = JSON.parse(message.body);
        callback(parsedMessage);
      });
    } else {
      console.error('WebSocket is not connected. Unable to subscribe to topic:', destination);
    }
  };


  return (
    <WebSocketContext.Provider value={{ sendMessage, subscribe, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
