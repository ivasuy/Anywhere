
import React, { useEffect, useState } from 'react';
import userFace from "../../assets/userFace.jpg";
import "./usersList.scss";
import { useDispatch, useSelector } from 'react-redux';
import DistanceSlider from '../DistanceSlider/DistanceSlider';
import { createNewPost } from '../../actions/postAction';
import { useAlert } from "react-alert";


import { Link, useNavigate } from "react-router-dom";
import { NEW_POST_RESET } from '../../constants/postConstants';


const UsersList = ({ post, setShowUserList, setCreatePostPermission, setSendPublicMessage }) => {
    const alert = useAlert();

    const navigate = useNavigate();

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);


    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.location_users);

    const { success, error } = useSelector((state) => state.new_post);

    useEffect(() => {
        console.log("Users List:", allUsers.users);
    }, [allUsers]);

    const handleUserClick = (user) => {
        setSelectedUsers((prev) => {
            if (prev.includes(user._id)) {
                return prev.filter((id) => id !== user._id);
            } else {
                return [...prev, user._id];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(allUsers.users.map((user) => user._id));
        }
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (e, user) => {
        e.stopPropagation();
        handleUserClick(user);
    };

    const handleSubmitPost = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('caption', post.caption);
        formData.append('accessibility', post.accessibility);
        formData.append('sharedWith', JSON.stringify(selectedUsers)); // Append the array as a single entry

        post.selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        dispatch(createNewPost(formData));
    };

    useEffect(() => {

        if (success) {
            console.log("UseEffect Triggered with success:", success);
            alert.success("Post created succesfully");
            setShowUserList(false)
            setCreatePostPermission(false);
            // window.location.reload()
            dispatch({ type: NEW_POST_RESET });
        }
        else if (error) {
            alert.error(error)
        }
    }, [success, alert, navigate, error])


    return (
        <div className='usersContainer'>
            <h1>Nearby Users</h1>
            <div id="distSlide">
                <DistanceSlider />
            </div>
            <div className='usersList'>
                {allUsers && allUsers.users.length > 0 ? (
                    <>
                        <div className="selectAllContainer">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                            <span>Select All</span>
                        </div>
                        <div id="userCount">
                            <span>Showing {allUsers.users.length} results</span>
                        </div>
                        {allUsers.users.map((user) => (
                            <div className="userDetails" key={user._id} onClick={() => handleUserClick(user)}>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={(e) => handleCheckboxChange(e, user)}
                                    onClick={(e) => e.stopPropagation()} // Prevents the user click event
                                />
                                <img src={userFace} alt="user" />
                                <span>{user.name}</span>
                            </div>
                        ))}
                    </>
                ) : (
                    <div id='emptyUserList'>Sorry ! no active users around you to display. Try increasing Radius.</div>
                )}
            </div>
            <div id="okButton" onClick={handleSubmitPost}>
                <button>Ok</button>
            </div>
        </div>
    );
};

export default UsersList;

