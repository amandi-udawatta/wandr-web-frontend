"use client";
import { useState } from "react";
import { FaPaperclip, FaSmile, FaCamera, FaMicrophone } from "react-icons/fa";
import {TbMoodHappy} from "react-icons/tb";
import {CiCamera, CiMicrophoneOn} from "react-icons/ci";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const handleInputChange = (e:any) => {
        setMessage(e.target.value);
    };

    return (
        <div className="flex justify-between items-center p-2  w-[calc(100%-30px)]">
            <div className="flex bg-blue-50 items-center w-full space-x-2 p-2.5 rounded-md ">
                <FaPaperclip className="text-gray-500 cursor-pointer" />
                <input
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={handleInputChange}
                    className="flex-grow bg-inherit focus:outline-none text-gray-700"
                />
                <TbMoodHappy   className="text-gray-500 text-lg cursor-pointer" />
                <CiCamera className="text-gray-500 text-lg cursor-pointer" />
            </div>

            <CiMicrophoneOn  className="bg-green-50 text-white mx-2 font-extrabold text-xl cursor-pointer rounded-md p-1 size-9" />
        </div>
    );
};

export default ChatInput;
