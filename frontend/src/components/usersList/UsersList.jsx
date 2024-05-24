import React, { useEffect, useState } from 'react';
import userFace from "../../assets/userFace.jpg";
import "./usersList.scss";
import UserDetails from '../UserDetails/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../actions/locationAction"

const UsersList = () => {
    const [showDetails, setShowDetails] = useState(false);


    return (

        <div className='usersContainer'>
            <div className='usersList' >
                <h1>Nearby users</h1>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
                <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John doe</span>
                    <span>{showDetails}</span>
                </div>
            </div>
            {showDetails && (
                <div className="moreUserDetails">
                    <UserDetails />
                </div>
            )}

        </div>

    );
}

export default UsersList;
