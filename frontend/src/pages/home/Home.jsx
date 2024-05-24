import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomeLoader from '../../components/HomeLoader/HomeLoader';

// import "./home.scss"

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
        (state) => state.user
    );
    // const [coordinates, setCoordinates] = useState({
    //     latitude: '',
    //     longitude: ''
    // });

    // const fetchCoords = () => {
    //     try {
    //         const watchId = navigator.geolocation.watchPosition((position) => {
    //             const { latitude, longitude } = position.coords;
    //             setCoordinates({
    //                 latitude: latitude,
    //                 longitude: longitude
    //             });
    //             console.log("Coordinates fetched successfully", { latitude, longitude });
    //             // console.log("Coordinates fetched successfully", position.coords);

    //             // Store coordinates in local storage
    //             localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }));
    //         });

    //         // Return a cleanup function to clear the watcher when component unmounts
    //         return () => navigator.geolocation.clearWatch(watchId);
    //     } catch (error) {
    //         console.log("Failed to fetch user location", error);
    //     }
    // };

    useEffect(() => {
        console.log(isAuthenticated)
        if (isAuthenticated) {
            setTimeout(() => {
                navigate("/my-feed")
            }, 4000);
        }
        else {
            setTimeout(() => {
                navigate("/login-redirect")
            }, 3000);
        }
    }, [isAuthenticated]);

    return (
        <div id='home'>
            {/* <h1>Anywhere</h1> */}
            <HomeLoader />

        </div>
    );
};

export default Home;
