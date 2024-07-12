import React, { useState } from 'react'

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import "./distanceSlider.scss"
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../actions/locationAction';


const DistanceSlider = () => {

    const minDistance = 10; // Minimum distance in meters
    const maxDistance = 5000; // Maximum distance in meters
    const [sliderValue, setSliderValue] = useState(0);

    const dispatch = useDispatch();



    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue); // Update slider value
    };

    const handleFetchUsers = () => {
        const data = localStorage.getItem("userCoordinates");
        const parsedData = JSON.parse(data);

        dispatch(
            fetchUsers(parsedData.longitude, parsedData.latitude, sliderValue)
        );
    };

    return (
        <div id='distanceSliderContainer'>
            <div id="distanceSlider">
                <Box sx={{ width: 400 }}>
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        min={minDistance}
                        max={maxDistance}
                        step={50} // Step value (increments of 10 meters)
                        valueLabelDisplay="auto"
                        aria-labelledby="distance-slider"
                    />
                </Box>
                <div id="fetchButton">
                    <button onClick={handleFetchUsers}>Find Users</button>
                </div>
            </div>
            <div id="distText">
                Use the slider to set the radius (in meters) in which you want to
                search for people.
            </div>
        </div>
    )
}

export default DistanceSlider