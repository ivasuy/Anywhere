import React, { useEffect } from "react";
import "./myfeed.scss";
import FloatingNav from "../../components/floatingNav/FloatingNav";
import Metadata from "../../components/layout/metadata/Metadata";
import Post from "../../components/post/Post";
import userFace from "../../assets/userFace.jpg";
import DrawerRight from "../../components/Drawer/DrawerRight";
import TopNav from "../../components/topNav/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { update_user_location } from "../../actions/locationAction";
import UserCardAndPhotos from "../../components/userCardAndPhotos/UserCardAndPhotos";
import SuggestedUsers from "../../components/suggestedUsers/SuggestedUsers";
import axios from "axios";
import { fetchMyFeedPosts } from "../../actions/postAction";

const MyFeed = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.myfeed_posts);



  useEffect(() => {
    const data = localStorage.getItem("userCoordinates");
    const parsedData = JSON.parse(data);
    dispatch(update_user_location(parsedData.longitude, parsedData.latitude));

    dispatch(fetchMyFeedPosts());

  }, []);


  return (
    <div id="myFeedContainer">

      <div id="myFeed">
        <Metadata title="My Feed" />
        <div id="topMyFeed">
          <DrawerRight />
          <TopNav />
        </div>
        <div id="bottomMyFeed">
          <div id="currentUserCard">
            <h1>Current user</h1>
            {user && <UserCardAndPhotos self={true} user={user} />}
          </div>

          <div id="bottomLeftMyFeed">
            {posts.length !== 0 ? posts.map((post, index) => (
              <Post data={post} />
            )) : (
              <h1>No new Posts in your feed</h1>
            )}
          </div>


          <div id="bottomRightMyFeed">
            <div id="suggestedUsers">
              <h1>Suggested Users</h1>
              <div id="userList">
                <SuggestedUsers />
              </div>
            </div>
          </div>

        </div>
        <div>
          <FloatingNav />
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
