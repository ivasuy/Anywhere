import React, { useEffect, useState } from 'react';
import userFace from "../../assets/userFace.jpg";
import "./usersList.scss";
import UserDetails from '../UserDetails/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from "../../actions/locationAction"

const UsersList = () => {
    const [showDetails, setShowDetails] = useState(false);
    const allUsers = useSelector((state) => state.location_users);

    useEffect(() => {
        console.log("lode ka", allUsers.users)
        console.log()
    }, [allUsers])

    const handleUserClick = () => {

    }



    return (

        <div className='usersContainer'>
            <div className='usersList' >
                <h1>Nearby users</h1>
                {allUsers && allUsers.users.length > 0 ? (
                    allUsers.users.map((user, index) => (
                        <div className="userDetails" key={index} onClick={() => handleUserClick(user)}>
                            <img src={userFace} alt="userImage" />
                            <span>{user.name}</span>
                        </div>
                    ))
                ) : (
                    <div id='emptyUserList'>No users to display</div>
                )}

                {/* <div className="userDetails" onClick={() => { setShowDetails(!showDetails) }}>
                    <img src={userFace} alt="userImage" />
                    <span>John dMoe</span>
                    <span>{showDetails}</span>
                </div> */}

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
