import React, { useState } from 'react';
import { MdGroups2 } from "react-icons/md";
import { CiChat2 } from "react-icons/ci";
import { GiMagicHat } from "react-icons/gi";
import "./chatNav.scss";

const ChatNav = ({ activeItem, onNavClick }) => {
    // const [activeItem, setActiveItem] = useState('myChats');

    // const onNavClick = (item) => {
    //     setActiveItem(item);
    // };

    return (
        <div id='chatNav'>
            <div id="logo">
                <h3>Anywhere</h3>
            </div>
            <div id="chatNavContent">
                <div
                    className={`chatNavContentItems ${activeItem === 'myChats' ? 'active' : ''}`}
                    onClick={() => onNavClick('myChats')}
                >
                    <div>
                        <CiChat2 size={40} color='black' />
                    </div>
                    <span>My Chats</span>
                </div>
                <div
                    className={`chatNavContentItems ${activeItem === 'groups' ? 'active' : ''}`}
                    onClick={() => onNavClick('groups')}
                >
                    <div>
                        <MdGroups2 size={40} color='black' />
                    </div>
                    <span>My groups</span>
                </div>
                <div
                    className={`chatNavContentItems ${activeItem === 'unknown' ? 'active' : ''}`}
                    onClick={() => onNavClick('unknown')}
                >
                    <div>
                        <GiMagicHat size={40} color='black' />
                    </div>
                    <span>New Chats</span>
                </div>
            </div>
        </div>
    );
};

export default ChatNav;
