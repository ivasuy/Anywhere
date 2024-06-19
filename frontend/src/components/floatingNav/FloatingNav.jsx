
import React from 'react';
import './floatingNav.scss';
import { Link, useLocation } from 'react-router-dom';

import ViewQuiltOutlinedIcon from '@material-ui/icons/ViewQuiltOutlined';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';

const FloatingNav = () => {
    const location = useLocation();

    return (
        <div id='fl-nav'>
            <div id="floating-nav">
                <Link to="/my-feed" id="myfeed" className={location.pathname === '/my-feed' ? 'active' : ''}>
                    <ViewQuiltOutlinedIcon fontSize="medium" style={{ color: "white" }} />
                    <span className={location.pathname === '/my-feed' ? 'activeDesc' : ''}> My Feed</span>

                </Link>
                <Link to="/explore-nearby" id="explore-nearby" className={location.pathname === '/explore-nearby' ? 'active' : ''}>
                    <PeopleIcon fontSize="medium" style={{ color: "white" }} />
                    <span className={location.pathname === '/explore-nearby' ? 'activeDesc' : ''}> Explore Nearby</span>

                </Link>
                <Link to="/explore-world" id="explore-world" className={location.pathname === '/explore-world' ? 'active' : ''}>
                    <PublicIcon fontSize="medium" style={{ color: "white" }} />
                    <span className={location.pathname === '/explore-world' ? 'activeDesc' : ''}> Explore World</span>
                </Link>
                <Link to="/myself" id="myself" className={location.pathname === '/myself' ? 'active' : ''}>
                    <PersonIcon fontSize="medium" style={{ color: "white" }} />
                    <span className={location.pathname === '/myself' ? 'activeDesc' : ''}> My profile</span>
                </Link>
            </div >
        </div>
    );
};

export default FloatingNav;
