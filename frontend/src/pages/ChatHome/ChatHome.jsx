import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatLayout from "../../components/layout/ChatLayout/ChatLayout";
import Title from "../../components/layout/Title/Title";

import "./chatHome.scss";
import ChatUsersList from "../../components/chatHome/chatUsersList/ChatUsersList";
import ChatNav from "../../components/chatHome/chatNav/ChatNav";
import ChatSpace from "../../components/chatHome/ChatSpace/ChatSpace";
import { getChats } from "../../actions/chatAction";
import ChatFiles from "../../components/chatHome/chatInfo/chatFiles/ChatFiles";
import ChatMembers from "../../components/chatHome/chatInfo/chatMembers/ChatMembers";
import { IoMdArrowBack } from "react-icons/io";

const ChatHome = () => {
    const dispatch = useDispatch();
    const [activeChatType, setActiveChatType] = useState("myChats"); // 'chums' or 'groups'
    const [selectedChat, setSelectedChat] = useState({});
    const [view, setView] = useState("default");
    const [secview, setsecView] = useState("userList");

    const handleNavClick = (type) => {
        setActiveChatType(type);
        setSelectedChat(null);// Reset selected user when chat type changes
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        if (window.innerWidth < 900) {
            setsecView('chatSpace')
        }
    };

    useEffect(() => {
        if (activeChatType === "myChats") {
            console.log("myChats part");
            dispatch(getChats(activeChatType));
        } else if (activeChatType === "groups") {
            console.log("groups part");
            dispatch(getChats(activeChatType));
        }
    }, [activeChatType, dispatch]);

    useEffect(() => {
        if (window.innerWidth > 900) {
            setView("default");
        } else {
            setView("mobileDefault");
        }
    }, []);

    return (
        <>
            {view === "default" && (
                <div id="chatHome">
                    <Title />
                    <div id="leftChatHome">
                        <ChatNav activeItem={activeChatType} onNavClick={handleNavClick} />
                    </div>
                    <div id="midChatHome">
                        <div id="left-midChatHome">
                            <ChatUsersList
                                chatType={activeChatType}
                                onSelectChat={handleChatSelect}
                            />
                        </div>
                        <div id="right-midChatHome">
                            <ChatSpace selectedChat={selectedChat} />
                        </div>
                    </div>
                    <div id="rightChatHome">
                        <div id="top-rightChatHome">
                            <ChatFiles selectedChat={selectedChat} />
                        </div>
                        <div id="bottom-rightChatHome">
                            <ChatMembers selectedChat={selectedChat} />
                        </div>
                    </div>
                </div>
            )}
            {view === "mobileDefault" && (
                <div id="chatHome">
                    <Title />
                    {secview === 'userList' &&
                        (
                            <div id="leftChatHome">
                                <ChatNav activeItem={activeChatType} onNavClick={handleNavClick} />
                            </div>
                        )}
                    {(secview === 'userList' || secview === 'chatSpace') && (
                        <div id="midChatHome">
                            {secview === 'userList' && (
                                <div id="left-midChatHome">
                                    <ChatUsersList
                                        chatType={activeChatType}
                                        onSelectChat={handleChatSelect}
                                    />
                                </div>
                            )}
                            {secview === 'chatSpace' && <div id="right-midChatHome">

                                <ChatSpace selectedChat={selectedChat} setsecView={setsecView} />
                            </div>}
                        </div>
                    )}
                    {secview === 'chatDetails' && (
                        <div id="rightChatHome">
                            <IoMdArrowBack size={25} onClick={() => setsecView('chatSpace')} />

                            <div id="top-rightChatHome">
                                <ChatFiles selectedChat={selectedChat} />
                            </div>
                            <div id="bottom-rightChatHome">
                                <ChatMembers selectedChat={selectedChat} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatHome;
