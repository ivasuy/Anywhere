import React, { useEffect } from 'react'
import "./exploreNearby.scss"
import FloatingNav from '../../components/floatingNav/FloatingNav'
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import Metadata from '../../components/layout/metadata/Metadata';
import { update_user_location } from '../../actions/locationAction';
import { useDispatch } from 'react-redux';



const ExploreNearby = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const data = localStorage.getItem("userCoordinates");
        const parsedData = JSON.parse(data);
        dispatch(update_user_location(parsedData.longitude, parsedData.latitude))
    }, [])

    return (
        <div>
            <Metadata title="Explore Nearby" />
            <div>ExploreNearby</div>
            <Link to="/chat-nearby"><ChatIcon /></Link>
            <div><FloatingNav /></div>

        </div>
    )
}

export default ExploreNearby