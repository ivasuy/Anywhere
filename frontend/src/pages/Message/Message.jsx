import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./message.scss"

const Message = () => {
    const { userId } = useParams();
    const [message, setMessage] = useState("");

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            };
            // First, create the chat
            const { data: chatData } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/create`,
                { userId },
                config
            );
            const chatId = chatData.chat._id;

            // Then, send the message
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/message/send`,
                { chatId, message },
                config
            );

            console.log("Message sent successfully");
            setMessage("");
        } catch (error) {
            console.log("Error:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div>
            <h1>Message User</h1>
            <form onSubmit={handleSendMessage}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Message;
