import React from 'react'
import "./exploreNearby.scss"
import FloatingNav from '../../components/floatingNav/FloatingNav'
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import Metadata from '../../components/layout/metadata/Metadata';
const ExploreNearby = () => {

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