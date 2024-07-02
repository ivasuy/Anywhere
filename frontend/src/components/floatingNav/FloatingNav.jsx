
import React, { useState } from 'react';
import './floatingNav.scss';
import { Link, useLocation } from 'react-router-dom';
import { PiLayoutThin } from "react-icons/pi";
import { SiOdysee } from "react-icons/si";
import { BiWorld } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RiNotification4Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { GrChannel } from "react-icons/gr";

const FloatingNav = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useSelector((state) => state.user);

    return (
        <div id='fl-nav' className={isVisible ? 'expanded' : ''}>
            <div id="show-nav-arrow" onClick={() => setIsVisible(!isVisible)}>
                <FaArrowRight size={30} color='white' />
            </div>
            <div id="floating-nav" className={isVisible ? 'visible' : 'hidden'}>
                <Link to="/my-feed" id="myfeed" className={location.pathname === '/my-feed' ? 'active' : ''}>
                    <PiLayoutThin size={25} color='white' />
                    <span className={location.pathname === '/my-feed' ? 'activeDesc' : ''}>My Feed</span>
                </Link>
                <Link to="/explore-nearby" id="explore-nearby" className={location.pathname === '/explore-nearby' ? 'active' : ''}>
                    <SiOdysee size={25} color='white' />
                    <span className={location.pathname === '/explore-nearby' ? 'activeDesc' : ''}>Explore Nearby</span>
                </Link>
                <Link to="/explore-world" id="explore-world" className={location.pathname === '/explore-world' ? 'active' : ''}>
                    <GrChannel size={25} color='white' />
                    <span className={location.pathname === '/explore-world' ? 'activeDesc' : ''}>Explore Channels</span>
                </Link>
                <Link to={`/notifications`} id="userNotifications" className={location.pathname === `/notifications` ? 'active' : ''}>
                    <RiNotification4Line size={25} color='white' />
                    <span className={location.pathname === `/notifications` ? 'activeDesc' : ''}>Notifications</span>
                </Link>
                <Link to={`/search/anywhere`} id="search" className={location.pathname === `/search/anywhere` ? 'active' : ''}>
                    <IoSearchOutline size={25} color='white' />
                    <span className={location.pathname === `/search/anywhere` ? 'activeDesc' : ''}>Search</span>
                </Link>
                <Link to={`/user/${user._id}`} id="myself" className={location.pathname === `/user/${user._id}` ? 'active' : ''}>
                    <BsPerson size={25} color='white' />
                    <span className={location.pathname === `/user/${user._id}` ? 'activeDesc' : ''}>My Profile</span>
                </Link>
            </div>
        </div>
    );
};

export default FloatingNav;
