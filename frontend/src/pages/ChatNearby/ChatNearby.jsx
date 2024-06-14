import React, { useState } from "react";
import "./ChatNearby.scss";
import Metadata from "../../components/layout/metadata/Metadata";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { fetchUsers } from "../../actions/locationAction";
import { useDispatch } from "react-redux";
import UserCardAndPhotos from "../../components/userCardAndPhotos/UserCardAndPhotos";
import FloatingNav from "../../components/floatingNav/FloatingNav";
import Warning from "../../components/Warning/Warning";
import CreatePost from "../../components/createPost/CreatePost";

const ChatNearby = () => {
  const minDistance = 10; // Minimum distance in meters
  const maxDistance = 1000; // Maximum distance in meters
  const [sliderValue, setSliderValue] = useState(0);

  const [warning, setWarning] = useState(false);
  const [createPostPermission, setCreatePostPermission] = useState(false);
  const [createMessageFlag, setCreateMessageFlag] = useState(false);

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

  return (
    <div className="chat-nearby-container">
      <Metadata title="Chat" />
      <div className="chatNearby-top">
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
          <div id="fetchButton">
            <button onClick={handleFetchUsers}>Find Users</button>
          </div>
        </div>
        <div id="distText">
          Use the slider to set the radius (in meters) in which you want to
          search for people.
        </div>

        <div id="distanceChatActionButtons">
          <div className="distanceActionButtons">
            <button onClick={() => {
              setWarning(true);
              setCreateMessageFlag(false);
            }}>
              Create a public post
            </button>
          </div>
          <div className="distanceActionButtons">
            <button onClick={() => {
              setWarning(true);
              setCreateMessageFlag(true);
            }}>
              Send a direct Message
            </button>
          </div>
          <div className="distanceActionButtons">
            <button>
              Explore channels around you
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
          <CreatePost setCreatePostPermission={setCreatePostPermission} />
        </div>
      )}
      {!warning && createMessageFlag && (
        <div id="createPost">
          {/* Replace this with your message component */}
          <p>Message Component Placeholder</p>
        </div>
      )}

      <div id="userListChatNearby">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} id="nearbyListItem">
            <UserCardAndPhotos />
          </div>
        ))}
      </div>

      <div>
        <FloatingNav />
      </div>
    </div>
  );
};

export default ChatNearby;
