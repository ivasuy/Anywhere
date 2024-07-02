import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './notifications.scss';
import FloatingNav from '../../components/floatingNav/FloatingNav';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get('/api/notifications');
                setNotifications(data.notifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div id="notifications-container">

            <div id="notifications">
                <h2>Notifications</h2>
                {notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    <ul>
                        {notifications.map((notification) => (
                            <li key={notification._id} className={notification.read ? "read" : "unread"}>
                                {notification.message}
                            </li>
                        ))}
                    </ul>
                )}
                <div>
                    <FloatingNav />
                </div>
            </div>
        </div>
    );
};

export default Notifications;
