
import React from 'react';
import './floatingNav.scss';
import { Link, useLocation } from 'react-router-dom';


import { PiLayoutThin } from "react-icons/pi";
import { TbFriends } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

const FloatingNav = () => {
    const location = useLocation();

    return (
        <div id='fl-nav'>
            <div id="floating-nav">
                <Link to="/my-feed" id="myfeed" className={location.pathname === '/my-feed' ? 'active' : ''}>
                    <PiLayoutThin size={30} color='white' />
                    <span className={location.pathname === '/my-feed' ? 'activeDesc' : ''}> My Feed</span>

                </Link>
                <Link to="/explore-nearby" id="explore-nearby" className={location.pathname === '/explore-nearby' ? 'active' : ''}>
                    <TbFriends size={30} color='white' />
                    <span className={location.pathname === '/explore-nearby' ? 'activeDesc' : ''}> Explore Nearby</span>

                </Link>
                <Link to="/explore-world" id="explore-world" className={location.pathname === '/explore-world' ? 'active' : ''}>
                    <BiWorld size={30} color='white' />
                    <span className={location.pathname === '/explore-world' ? 'activeDesc' : ''}> Explore Channels</span>
                </Link>
                <Link to="/myself" id="myself" className={location.pathname === '/myself' ? 'active' : ''}>
                    <BsPerson size={30} color='white' />
                    <span className={location.pathname === '/myself' ? 'activeDesc' : ''}> My profile</span>
                </Link>
            </div >
        </div>
    );
};

export default FloatingNav;
