import React, { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { GrAttachment } from "react-icons/gr";
import { BsSendFill } from "react-icons/bs";
import "./ChatSpace.scss";
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import userFace from '../../../assets/userFace.jpg'

const ChatSpace = ({ selectedChat, setsecView }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user } = useSelector((state) => state.user);

    const handleSearchIconClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    useEffect(() => {
        console.log("selected chat", selectedChat);
    }, [selectedChat]);

    if (!selectedChat) {
        return <div id='chatSpace'>Select a chat to start messaging</div>;
    }

    const isGroupChat = selectedChat.groupChat;
    let name, avatar;

    if (isGroupChat) {
        name = selectedChat.name;
        avatar = selectedChat.avatar?.url;
    } else {
        const otherMember = selectedChat.members?.find(member => member._id !== user._id); // Check if members exist
        name = otherMember?.name;
        avatar = otherMember?.avatar?.url;
    }

    return (
        selectedChat ? (
            <div id='chatSpace'>
                <div id="chatSpace-topNav">
                    <div id="left-chatSpace-topNav" onClick={() => setsecView('chatDetails')}>
                        <div id="chatName">
                            <div id="dp">
                                <img src={userFace} alt="userFace" />
                            </div>
                            {name}
                        </div>
                        <div id="shortchatInfo">
                            2 members, 10 online
                        </div>
                    </div>
                    <div id="right-chatSpace-topNav">
                        <div className="chatSpace-topNavIcon">
                            {isSearchOpen && <input type="text" placeholder="Search" />}
                            <CiSearch size={25} onClick={handleSearchIconClick} />
                        </div>
                        {/* <div className="chatSpace-topNavIcon">
                            <IoCallOutline size={25} />
                        </div> */}
                        <div className="chatSpace-topNavIcon">
                            <SlOptionsVertical size={25} />
                        </div>
                        <div className="chatSpace-topNavIcon">
                            <IoMdArrowBack size={25} onClick={() => setsecView('userList')} />
                        </div>
                    </div>
                </div>
                <div id="chatSpace-restAll">
                    <div id="chatSpace-messages">
                        {/* Messages will go here */}
                    </div>
                    <div id="chatSpaceTypeMessage">
                        <GrAttachment size={30} color='gray' />
                        <input type="text" placeholder="Type a message" />
                        <BsSendFill size={30} color='hsl(60, 94%, 36%)' />
                    </div>
                </div>
            </div>
        ) : (
            <div id='chatSpace'>Select a chat to start messaging</div>
        )
    );

};

export default ChatSpace;
