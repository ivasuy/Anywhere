import React, { useEffect, useState } from 'react'
import "./exploreNearby.scss"
import FloatingNav from '../../components/floatingNav/FloatingNav'
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import Metadata from '../../components/layout/metadata/Metadata';
import { update_user_location } from '../../actions/locationAction';
import { useDispatch, useSelector } from 'react-redux';
import TopNav from '../../components/topNav/TopNav';
import axios from 'axios';
import Post from '../../components/post/Post';
import "./exploreNearby.scss"
import UserCardAndPhotos from '../../components/userCardAndPhotos/UserCardAndPhotos';



const ExploreNearby = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [ENposts, setENposts] = useState([]);

    const fetchExploreNearbyPosts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/explore-nearby/posts`, { withCredentials: true });

            setENposts(data.posts);

            console.log(ENposts)

            console.log("explore nearby posts ", data.posts);

        } catch (error) {
            console.log("error while fetching posts in explore nearby frontend: ", error);
        }

    }

    useEffect(() => {
        const data = localStorage.getItem("userCoordinates");
        const parsedData = JSON.parse(data);
        dispatch(update_user_location(parsedData.longitude, parsedData.latitude))

        fetchExploreNearbyPosts();

    }, [])

    return (
        <div id='exploreNearbyContainer'>
            <Metadata title="Explore Nearby" />
            <div id="exploreNearby">
                <div id="topExploreNearby">
                    <TopNav />
                    <div id='exploreNearby-subheading'>Explore what are people sharing around you</div>
                    <Link to="/chat-nearby"><ChatIcon /></Link>
                </div>
                <div id="bottomExploreNearby">
                    <div id="exploreNearbyPosts">
                        {ENposts.length !== 0 ? ENposts.map((post, index) => (
                            <Post data={post} />
                        )) : (
                            <h1>No new Posts in your feed</h1>
                        )}
                    </div>
                    {/* <div id="currentUserCard">
                        <h1>Current user</h1>
                        {user && <UserCardAndPhotos self={true} user={user} />}
                    </div> */}
                </div>
            </div>
            <div><FloatingNav /></div>

        </div>
    )
}

export default ExploreNearby