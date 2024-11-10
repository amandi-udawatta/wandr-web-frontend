import {Avatar, Badge, Col, Row} from "antd";
import {CheckOutlined, MoreOutlined, PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {ChatCard} from "@/components/business/chat/ChatCard";
import ChatInput from "@/components/business/chat/ChatInput";
import {ChatSentMsg} from "@/components/business/chat/ChatSentMsg";
import {ChatRecivedMsg} from "@/components/business/chat/ChatRecivedMsg";

export const ChatContent = () => {
    return (
        <Row className="px-6 py-10 flex-row flex justify-around" >
            <Col span="8">
                <div className="flex flex-col bg-white rounded-2xl shadow-lg shadow-blue-200   w-full h-[500px] ">
                    <h2 className="text-2xl font-bold text-gray-800  p-4">Clients</h2>
                    <div className="overflow-auto w-full h-full px-4">
                        <ChatCard name="John Doe" message="Hello, how are you doing today?" time="Today, 12:00 PM" imageurl="/person-1.png" tag={<CheckOutlined />}  />
                        <ChatCard name="Yunal" message="Hi, I am interested in your product" time="Today, 2:00 PM" imageurl="/person-2.png" tag={<Badge count={2} />}  />
                        <ChatCard name="Doe" message="My Device is not working" time="Today, 3:00 PM" imageurl="/person-3.png" tag={<Badge count={1} />}  />
                        <ChatCard name="Ben" message="I need help with my account" time="Today, 4:00 PM" imageurl="/person-4.png" tag={<CheckOutlined />}  />
                        <ChatCard name="John Doe" message="Hello, how are you doing today?" time="Today, 12:00 PM" imageurl="/person-1.png" tag={<CheckOutlined />}  />
                        <ChatCard name="Yunal" message="Hi, I am interested in your product" time="Today, 2:00 PM" imageurl="/person-2.png" tag={<Badge count={2} />}  />
                        <ChatCard name="Doe" message="My Device is not working" time="Today, 3:00 PM" imageurl="/person-3.png" tag={<Badge count={1} />}  />
                        <ChatCard name="Ben" message="I need help with my account" time="Today, 4:00 PM" imageurl="/person-4.png" tag={<CheckOutlined />}  />
                    </div>
                </div>
            </Col>
            <Col span="15">
                <div className="flex flex-col justify-between bg-white rounded-2xl shadow-lg shadow-blue-200 p-4 w-full h-[500px]">
                    <div className=" flex flex-row justify-between mx-5 w-auto py-3 border-gray-10 border-b-2">
                        <div className="flex flex-row items-center  gap-2">
                            <Avatar src="/person-1.png" size={50} />
                            <div>
                                <p className="text-[16px] font-bold text-gray-800">John Doe</p>
                                <p className="text-sm text-gray-500">Online</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-5 text-xl text-green-600">
                            <PhoneOutlined className="cursor-pointer" />
                            <VideoCameraOutlined className="cursor-pointer"/>
                            <MoreOutlined className="cursor-pointer"/>
                        </div>
                    </div>
                    <div className=" overflow-auto mx-4 w-auto h-96 relative p-4 space-y-4">
                        <ChatSentMsg time="12:00 PM" message="Hello, how are you doing today?" />
                        <ChatRecivedMsg time="12:00 PM" message="I am doing great, thank you for asking" />
                        <ChatSentMsg time="12:00 PM" message="I am interested in your product" />
                        <ChatRecivedMsg time="12:00 PM" message="Sure, I will send you the details" />
                        <ChatSentMsg time="12:00 PM" message="Thank you" />
                        <ChatRecivedMsg time="12:00 PM" message="You are welcome" />
                        <ChatSentMsg time="12:00 PM" message="Hello, how are you doing today?" />
                        <ChatRecivedMsg time="12:00 PM" message="I am doing great, thank you for asking" />





                        <div className="sticky w-[calc(100%-30px)]  bottom-0 flex flex-col items-center gap-2 pb-5">
                            <ChatInput/>
                        </div>
                    </div>


                </div>
            </Col>
        </Row>
  );
}