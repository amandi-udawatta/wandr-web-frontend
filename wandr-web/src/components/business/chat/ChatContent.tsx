'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Badge, Col, Row, Input } from "antd";
import { ChatCard } from "@/components/business/chat/ChatCard";
import { ChatSentMsg } from "@/components/business/chat/ChatSentMsg";
import { ChatReceivedMsg } from "@/components/business/chat/ChatReceivedMsg";
import ChatInput from "@/components/business/chat/ChatInput";
import { SearchOutlined } from '@ant-design/icons';
import { apiService } from "@/services/apiService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useWebSocket } from "@/services/WebSocketContextService";
import { format, isSameDay } from 'date-fns';

export const ChatContent = () => {
    const [traveller, setTraveller] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(""); // Search input value
    const [selectedTraveller, setSelectedTraveller] = useState<any | null>(null); // Selected traveller for chatting
    const [chatMessages, setChatMessages] = useState<any[]>([]); // Chat messages for the selected traveller
    const { subscribe, sendMessage } = useWebSocket(); // Use WebSocket context

    // Reference to the messages container for auto-scroll
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Decode user ID from token
    const token = Cookies.get("accessToken");
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? (decodedToken as any).id : null;

    
    // Scroll to the bottom whenever messages are updated
    useEffect(() => {
        // Auto-scroll to the bottom of the chat
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };
        scrollToBottom();
    }, [chatMessages]);


    // Fetch traveller from the API
    useEffect(() => {
        const fetchTraveller = async () => {
            try {
                const response = await apiService.get(`/business/chatted-travellers/${userId}`);
                console.log("Raw API Response:", response); // Log raw response
                setTraveller(response.data); // Set approved traveller in state
            } catch (error) {
                console.error("Failed to fetch traveller:", error);
            }
        };
        fetchTraveller();
    }, []);

    // Fetch chat messages when a traveller is selected
    useEffect(() => {
        if (selectedTraveller) {
            const fetchChatHistory = async () => {
                try {
                    const senderId = userId; // Logged-in user's ID
                    const receiverId = selectedTraveller.travellerId; // Use the selected traveller's ID
                    const response = await apiService.get(`/chat/history?senderId=${senderId}&receiverId=${receiverId}`);
                    setChatMessages(response.data); // Set chat messages for the selected traveller
                } catch (error) {
                    console.error("Failed to fetch chat history:", error);
                }
            };
            fetchChatHistory();
            // Subscribe to WebSocket topic for real-time messages
            subscribe('/topic/messages', (newMessage: any) => {
                if (
                    (newMessage.senderId === userId && newMessage.receiverId === selectedTraveller.travellerId) ||
                    (newMessage.senderId === selectedTraveller.travellerId && newMessage.receiverId === userId)
                ) {
                    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
                }
            });
        }
    }, [selectedTraveller, userId, subscribe]);

    // Handle search input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Filter traveller based on the search term
    const filteredTraveller = (traveller || []).filter((traveller) =>
        traveller.name.toLowerCase().includes(searchTerm)
    );

    const renderChatMessages = () => {
        let lastDate: Date | null = null;

        return chatMessages.map((msg, index) => {
            const messageDate = new Date(msg.timestamp);
            const showDate =
                !lastDate || !isSameDay(lastDate, messageDate); // Check if it's the first message of a new day

            lastDate = messageDate; // Update the lastDate reference
            return (
                <React.Fragment key={index}>
                    {showDate && (
                        <div className="text-gray-500 text-sm text-center my-2">
                            {format(messageDate, 'EEEE, dd MMM yyyy')} {/* Display date */}
                        </div>
                    )}
                    {msg.senderId === userId ? (
                        <ChatSentMsg time={format(messageDate, 'HH:mm')} message={msg.message} />
                    ) : (
                        <ChatReceivedMsg time={format(messageDate, 'HH:mm')} message={msg.message} />
                    )}
                </React.Fragment>
            );
        });
    };

    return (
        <Row className="px-6 py-10 flex-row flex justify-around">
            {/* Left panel: Business list */}
            <Col span={8}>
                <div className="flex flex-col bg-white border border-gray-200 rounded-xl w-full h-[500px]">
                    <h2 className="text-2xl font-bold text-gray-800 p-4">Traveller</h2>
                    <div className="flex p-4">
                        <Input
                            placeholder="Search by Shop Name or Title..."
                            allowClear
                            value={searchTerm}
                            onChange={(e) => handleSearch(e)}
                            style={{ marginBottom: 16, width: '512px', height: '40px' }}
                            prefix={<SearchOutlined style={{ color: '#609734' }} />}
                        />
                    </div>
                    <div className="overflow-auto w-full h-full px-4">
                        {traveller && traveller.length > 0 ? (
                            filteredTraveller.map((traveller) => (
                            <ChatCard
                                key={traveller.travellerId}
                                name={traveller.name}
                                message={traveller.description || "Click to start chatting!"}
                                time={""}
                                imageurl={traveller.profileImage || "/default-traveller.png"}
                                tag={<Badge count={0} />} // Show unread messages count if available
                                onClick={() => setSelectedTraveller(traveller)} // Select traveller on click
                            />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full p-5">
                                <p className="text-gray-500 text-lg text-center">
                                    No messages from customers. Stay alerted for your first message!
                                </p>
                            </div>
                        )}
                        </div>

                </div>
            </Col>

            {/* Right panel: Chat window */}
            <Col span={15}>
                <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-4 w-full h-[500px]">
                    {!selectedTraveller ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500 text-lg">Select a traveller to start chatting</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex flex-row justify-between mx-5 w-auto py-3 border-gray-10 border-b-2">
                                <div className="flex flex-row items-center gap-2">
                                    <Avatar src={selectedTraveller.profileImage || "/default-traveller.png"} size={50} />
                                    <div>
                                        <p className="text-[16px] font-bold text-gray-800">{selectedTraveller.name}</p>
                                        <p className="text-sm text-gray-500">Traveller</p>
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-auto mx-4 w-auto h-96 relative p-4 space-y-4">
                                {renderChatMessages()}
                                <div ref={messagesEndRef}></div> {/* Auto-scroll reference */}
                            </div>
                            
                            {/* Chat input */}
                            <div className="sticky w-[calc(100%-30px)] bottom-0 flex flex-col items-center gap-2">
                                <ChatInput
                                    senderId={userId} // Pass senderId dynamically
                                    receiverId={selectedTraveller.travellerId} // Pass receiverId dynamically
                                    onSend={(message: string) => {
                                        setChatMessages((prev) => [...prev, { senderId: userId, receiverId: selectedTraveller.travellerId, message, timestamp: new Date().toISOString() },
                                        ]);
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Col>
        </Row>
    );
};
