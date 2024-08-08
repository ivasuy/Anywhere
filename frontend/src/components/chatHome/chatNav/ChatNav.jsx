import React, { useState } from 'react';
import { MdGroups2 } from "react-icons/md";
import { CiChat2 } from "react-icons/ci";
import { GiMagicHat } from "react-icons/gi";
import "./chatNav.scss";
import { Link } from 'react-router-dom';

const ChatNav = ({ activeItem, onNavClick }) => {
    // const [activeItem, setActiveItem] = useState('myChats');

    // const onNavClick = (item) => {
    //     setActiveItem(item);
    // };

    return (
        <div id='chatNav'>
            <Link to="/">
                <div id="logo">
                    <h3>Anywhere</h3>
                </div>
            </Link>
            <div id="chatNavContent">
                <div
                    className={`chatNavContentItems ${activeItem === 'myChats' ? 'active' : ''}`}
                    onClick={() => onNavClick('myChats')}
                >
                    <div>
                        <CiChat2 size={25} color='white' />
                    </div>
                    <span>My Chats</span>
                </div>
                <div
                    className={`chatNavContentItems ${activeItem === 'groups' ? 'active' : ''}`}
                    onClick={() => onNavClick('groups')}
                >
                    <div>
                        <MdGroups2 size={25} color='white' />
                    </div>
                    <span>My groups</span>
                </div>
                <div
                    className={`chatNavContentItems ${activeItem === 'unknown' ? 'active' : ''}`}
                    onClick={() => onNavClick('unknown')}
                >
                    <div>
                        <GiMagicHat size={25} color='white' />
                    </div>
                    <span>New Chats</span>
                </div>
            </div>
        </div>
    );
};

export default ChatNav;
