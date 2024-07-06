import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notifications.scss';
import FloatingNav from '../../components/floatingNav/FloatingNav';
import { myNotifications } from '../../actions/notificationAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const dispatch = useDispatch();
    const { allNotifications } = useSelector((state) => state.all_notifications);
    const [receivedRequests, setreceivedRequests] = useState([]);
    const [sentRequests, setsentRequests] = useState([]);

    const updateReadReceipts = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/update/read-receipt`, { withCredentials: true });
        } catch (error) {
            console.error('Error updating read receipts:', error);
        }
    };

    const fetchAllRequests = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/my-requests`, { withCredentials: true });

            setreceivedRequests(data.receivedRequests);
            setsentRequests(data.sentRequests)

        } catch (error) {
            console.error('Error fetching user requests:', error);
        }
    }

    const handleAcceptChumRequest = async (e, requestId) => {
        e.preventDefault();
        try {
            console.log("accept id", requestId);
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/accept-chum-request`, {
                requestId: requestId,
                accept: true
            }, config);

            fetchAllRequests();

            console.log(data);

        } catch (error) {
            console.log("error occured in accepting request", error.message)
        }

    }

    const deleteChumRequest = async (e, requestId) => {
        e.preventDefault();
        try {
            console.log("accept id", requestId);
            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/accept-chum-request`, {
                requestId: requestId,
                accept: false
            }, config);

            fetchAllRequests();

            console.log(data);

        } catch (error) {
            console.log("error occured in accepting request", error.message)
        }
    }


    useEffect(() => {
        dispatch(myNotifications());
        fetchAllRequests();

    }, [dispatch]);

    useEffect(() => {
        if (allNotifications && allNotifications.length > 0) {
            updateReadReceipts();
        }
    }, [allNotifications]);

    return (
        <div className="notifications-container">
            <div id="left-notificationsContainer">
                <div id="notifications">
                    <h2>Notifications</h2>
                    {allNotifications && allNotifications.length === 0 ? (
                        <p>No notifications</p>
                    ) : (
                        <div id='eachNotification'>
                            {allNotifications && allNotifications.map((notification) => (
                                <div key={notification._id} className={notification.read ? "read" : "unread"}>
                                    {notification.message}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="newRequests-container">
                <h2>Requests</h2>

                <div id="allRequests">
                    <h3>Received requests</h3>
                    {receivedRequests && receivedRequests.length === 0 ? (
                        <p>No Recieved requests</p>
                    ) : (
                        <div className="myRequests">

                            {receivedRequests && receivedRequests.map((request) => (
                                <div id='requestContent' key={request._id}>
                                    <span><Link to={`/user/:${request.sender._id}`}>@{request.sender.username}</Link> has sent you a chum request</span>
                                    <div id="request-buttons">
                                        <button onClick={(e) => handleAcceptChumRequest(e, request._id)}>Accept</button>
                                        <button onClick={(e) => deleteChumRequest(e, request._id)}>Delete</button>

                                    </div>
                                </div>
                            ))}
                        </div>

                    )}
                    <h3>Sent requests</h3>
                    {sentRequests && sentRequests.length === 0 ? (
                        <p>No Sent requests</p>
                    ) : (
                        <div className="myRequests">
                            {sentRequests && sentRequests.map((request) => (
                                <div id='requestContent'>
                                    <span>You sent a chum request to <Link to={`/user/:${request.receiver._id}`}>@{request.receiver.username}</Link></span>
                                    <div id="request-buttons">
                                        <button>Undo</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </div>


            </div>

            <FloatingNav />
        </div>
    );
};

export default Notifications;


