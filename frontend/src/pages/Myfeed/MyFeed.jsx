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

const MyFeed = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    const data = localStorage.getItem("userCoordinates");
    const parsedData = JSON.parse(data);

    dispatch(update_user_location(parsedData.longitude, parsedData.latitude));

  }, []);

  const postData = {
    content: [
      {
        type: "image",
        src: userFace,
      },
      {
        type: "image",
        src: userFace,
      },
      {
        type: "image",
        src: userFace,
      },
      {
        type: "text",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnisaepe vitae autem rem corrupti, natus excepturi possimus liberonisi, ullam unde? Officia, deserunt laudantium voluptas suscipitrepellendus sapiente aliquam sit illum aliquid quisquam eiusofficiis sequi, accusantium mollitia perspiciatis aut omnis id?Sed deleniti sequi adipisci minus nemo sapiente voluptatenumquam saepe, asperiores, eaque totam culpa.Repellat enimimpedit nisi saepe ut quaerat voluptas.Illo ipsam atqueveritatis voluptatum facilis earum repellat veniam eveniet omnisducimus quasi labore sunt nostrum, velit officia vel vitae!Deserunt amet earum temporibus dicta, obcaecati quam delenitiipsum dolor, sit amet consectetur adipisicing elit. Magnisaepe vitae autem rem corrupti, natus excepturi possimus liberonisi, ullam unde? Officia, deserunt laudantium voluptas suscipitrepellendus sapiente aliquam sit illum aliquid quisquam eiusofficiis sequi, accusantium mollitia perspiciatis aut omnis id?Sed deleniti sequi adipisci minus nemo sapiente voluptatenumquam saepe, asperiores, eaque totam culpa.Repellat enimimpedit nisi saepe ut quaerat voluptas.Illo ipsam atqueveritatis voluptatum facilis earum repellat veniam eveniet omnisducimuus dicta, obcaecati quam deleniti",
      },
    ],

    caption: "A beautiful face!",
  };

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
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
            <Post data={postData} />
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
