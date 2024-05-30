import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';


import './carousel1.scss';

// import required modules
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from "../../../actions/locationAction.js"


export default function Carousel1() {

    const nearbyUsers = useSelector((state) => state.location_users);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem('userCoordinates');
        const parsedData = JSON.parse(data);
        dispatch(fetchUsers(parsedData.longitude, parsedData.latitude, 500));

    }, [])

    // useEffect(() => {
    //     console.log("lode ka", nearbyUsers.users)

    // }, [nearbyUsers])



    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                {nearbyUsers ? nearbyUsers.users.map((user, index) => (
                    <SwiperSlide key={index}>
                        {/* Replace this with the desired content for each user */}
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.description}</p>
                        </div>
                    </SwiperSlide>
                )) : null}
            </Swiper>
        </>
    );
}
