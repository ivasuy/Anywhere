import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import ChatLayout from '../../components/layout/ChatLayout/ChatLayout';
import Title from '../../components/layout/Title/Title';

import "./chatHome.scss";
import ChatUsersList from '../../components/chatHome/chatUsersList/ChatUsersList';
import ChatNav from '../../components/chatHome/chatNav/ChatNav';
import ChatSpace from '../../components/chatHome/ChatSpace/ChatSpace';
import { getChats } from '../../actions/chatAction';

const ChatHome = () => {

    const dispatch = useDispatch();


    const [activeChatType, setActiveChatType] = useState('myChats'); // 'chums' or 'groups'
    const [selectedChat, setSelectedChat] = useState({});
    const [singleChatUsers, setSingleChatUsers] = useState([]);
    const [groupChatUsers, setGroupChatUsers] = useState([]);


    const handleNavClick = (type) => {
        setActiveChatType(type);
        setSelectedChat(null); // Reset selected user when chat type changes
    };

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    useEffect(() => {
        if (activeChatType === 'myChats') {
            console.log("myChats part")

            dispatch(getChats(activeChatType))
        }

        else if (activeChatType === 'groups') {

            console.log("groups part")
            dispatch(getChats(activeChatType))
        }

        else if (activeChatType === 'unknown') {

        }
    }, [activeChatType, dispatch])



    return (
        <div id='chatHome'>
            <Title />
            <div id="leftChatHome">
                <ChatNav activeItem={activeChatType} onNavClick={handleNavClick} />
            </div>
            <div id="midChatHome">
                <div id="left-midChatHome">
                    <ChatUsersList chatType={activeChatType}
                        // singleChatUsers={singleChatUsers}
                        // groupChatUsers={groupChatUsers}
                        onSelectChat={handleChatSelect} />
                </div>
                <div id="right-midChatHome">
                    <ChatSpace selectedChat={selectedChat} />
                </div>
            </div>
            <div id="rightChatHome">
                <div id="top-rightChatHome">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis temporibus ipsam fugiat sit dolor aliquid nemo repellat cum officiis ullam.
                </div>
                <div id="bottom-rightChatHome">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla molestias, aliquid labore tempore quaerat magni id! Libero deleniti ipsam minima assumenda sint, temporibus debitis qui consectetur? Atque, repellat ex est veritatis voluptate numquam blanditiis commodi sed sunt, dolor laboriosam odit?

                </div>
            </div>
        </div>
    );
}

export default ChatHome;
