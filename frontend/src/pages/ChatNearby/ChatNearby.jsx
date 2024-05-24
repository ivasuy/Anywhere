import React, { useState } from 'react';
import "./ChatNearby.scss";
import AppLayout from '../../components/layout/AppLayout';
import Metadata from '../../components/layout/metadata/Metadata';
import UsersList from '../../components/usersList/UsersList';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { fetchUsers } from "../../actions/locationAction"
import { useDispatch, useSelector } from 'react-redux';



const ChatNearby = () => {
    const minDistance = 10; // Minimum distance in meters
    const maxDistance = 1000; // Maximum distance in meters
    const [sliderValue, setSliderValue] = useState(0); // Initial slider value (middle of range)
    const dispatch = useDispatch();

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue); // Update slider value


    };

    const handleFetchUsers = () => {
        const data = localStorage.getItem('userCoordinates');
        const parsedData = JSON.parse(data);

        dispatch(fetchUsers(parsedData.longitude, parsedData.latitude, sliderValue));
    }

    // function toggle_view() {
    //     setView(!view);
    // }

    return (
        <div className="chat-nearby-container">
            <Metadata title="Chat" />
            <div className='chatNearby-top'>
                <h1>Distance Slider</h1>
                <div id="distanceSlider">
                    <Box sx={{ width: 800 }}>
                        <Slider
                            value={sliderValue}
                            onChange={handleSliderChange}
                            min={minDistance}
                            max={maxDistance}
                            step={10} // Step value (increments of 10 meters)
                            valueLabelDisplay="auto"
                            aria-labelledby="distance-slider"
                        />
                    </Box>
                    <button onClick={handleFetchUsers} id='fetchButton'>find Users</button>

                </div>
                <div id='distText'>Use the Slider to set the Radius (in meters) in which you want to search people in</div>
                {/* <button id="toggle-button" onClick={toggle_view}>toggle View</button> */}
            </div>
            <div id='userListChatNearby'>
                <UsersList />
                <div id='mapViewUsersList'>
                    Mapview
                </div>

            </div>
        </div>
    );
};

export default ChatNearby;
