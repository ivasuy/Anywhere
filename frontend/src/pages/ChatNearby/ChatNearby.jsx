import React, { useEffect, useState } from "react";
import "./ChatNearby.scss";
import Metadata from "../../components/layout/metadata/Metadata";

import { fetchUsers } from "../../actions/locationAction";
import { useDispatch, useSelector } from "react-redux";
import UserCardAndPhotos from "../../components/userCardAndPhotos/UserCardAndPhotos";
import FloatingNav from "../../components/floatingNav/FloatingNav";
import Warning from "../../components/Warning/Warning";
import CreatePost from "../../components/createPost/CreatePost";
import DistanceSlider from "../../components/DistanceSlider/DistanceSlider";
import { update_user_location } from '../../actions/locationAction';


const ChatNearby = () => {

  const dispatch = useDispatch();


  const [warning, setWarning] = useState(false);
  const [createPostPermission, setCreatePostPermission] = useState(false);
  // const [sendPublicMessage, setSendPublicMessage] = useState(false);
  const [createMessageFlag, setCreateMessageFlag] = useState(false);

  const allUsers = useSelector((state) => state.location_users);




  const handleAgree = () => {
    setWarning(false);
    if (createMessageFlag) {
      setCreateMessageFlag(true);
      setCreatePostPermission(false);
    } else {
      setCreatePostPermission(true);
      setCreateMessageFlag(false);
    }
  };

  const handleDisagree = () => {
    setWarning(false);
    setCreatePostPermission(false);
    setCreateMessageFlag(false);
  };

  useEffect(() => {
    const data = localStorage.getItem("userCoordinates");
    const parsedData = JSON.parse(data);
    dispatch(update_user_location(parsedData.longitude, parsedData.latitude))
  }, [])



  return (
    <div className="chat-nearby-container">
      <Metadata title="Chat" />
      <div className="chatNearby-top">
        <h1>Set Radius</h1>
        <DistanceSlider />

        <div id="distanceChatActionButtons">
          <div className="distanceActionButtons">
            <button onClick={() => {
              setWarning(true);
              setCreateMessageFlag(false);
            }}>
              Create a public post
            </button>
          </div>
          {/* <div className="distanceActionButtons">
            <button onClick={() => {
              setWarning(true);
              setCreateMessageFlag(true);
            }}>
              Send a direct Message
            </button>
          </div> */}
          <div className="distanceActionButtons">
            <button>
              Explore channels around
            </button>
          </div>
        </div>
      </div>

      {warning && (
        <div id="warning">
          <Warning onAgree={handleAgree} onDisagree={handleDisagree} />
        </div>
      )}
      {!warning && createPostPermission && (
        <div id="createPost">
          <CreatePost setCreatePostPermission={setCreatePostPermission} accessFlag={false} />
        </div>
      )}
      {/* {!warning && createMessageFlag && (
        <div id="createPost">
          <p>Message Component Placeholder</p>
        </div>
      )} */}

      {/* <div id="userListChatNearby">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} id="nearbyListItem">
            <UserCardAndPhotos />
          </div>
        ))}
      </div> */}
      {allUsers && allUsers.users && <div id="userListChatNearby">
        {allUsers.users.map((user, index) => (
          <div key={index} id="nearbyListItem">
            <UserCardAndPhotos self={false} user={user} />
          </div>
        ))}
      </div>}

      <div>
        <FloatingNav />
      </div>
    </div>
  );
};

export default ChatNearby;
