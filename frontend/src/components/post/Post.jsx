
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { LiaComment } from "react-icons/lia";
import { CiShare2 } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";
import { BiUpvote } from "react-icons/bi";
import { BiSolidUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import "./post.scss";
import axios from "axios";

const Post = ({ data }) => {

  const { mediaFiles, caption, creator } = data;

  const [count, setCount] = useState({});
  const [checkBehold, setcheckBehold] = useState(false);

  const { user } = useSelector((state) => state.user);


  const checkBeholdUser = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/check-behold`,
        { userId: user._id },
        config
      );

      setcheckBehold(data.isInBeholdList);
      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  }

  const handleBeholdUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/behold`,
        { userId: user._id },
        config
      );
      setcheckBehold(true); // Update the state directly

      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  };

  const fetchCount = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/all-count`,
        { userId: user._id },
        config
      );
      setCount(data.count);

    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const renderContent = (content, index) => {
    switch (content.mediaType) {
      case "video":
        return (
          <video key={index} controls src={content.url} className="mediaFile" />
        );
      case "audio":
        return (
          <audio key={index} controls src={content.url} className="mediaFile" />
        );
      case "image":
        return (
          content.url && (
            <img
              key={index}
              src={content.url}
              alt={`Content ${index}`}
              className="mediaFile"
            />
          )
        );
      default:
        return null;
    }
  };

  return data ? (
    <div className="post">
      <div id="carouselPost">
        {mediaFiles.length > 0 && (
          <Swiper effect={"cards"} grabCursor={true} className="mySwiper">
            {mediaFiles.map((file, index) => (
              <SwiperSlide key={index}>
                {renderContent(file, index)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div id="captionAndOptions">
        <div id="options">
          {creator.avatar && (
            <img src={creator.avatar} alt="Profile" />
          )}
          <div>John Doe</div>
          <span id="behold">behold</span>
          <span id="behold">chum request</span>
        </div>
        <div className="caption">
          {caption && (
            <div>
              <p>{caption}</p>
            </div>
          )}
        </div>
        <div id="options2">
          <div id="left">
            <Tooltip title="Comment">
              <IconButton>
                <LiaComment size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton>
                <CiShare2 size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton>
                <CiSaveDown2 size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div id="right">
            <Tooltip title="upvote">
              <IconButton>
                <BiUpvote size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="downvote">
              <IconButton>
                <BiDownvote size={30} style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div id="bottomPost">
          <span>shared with you and 10 others on 2:30 pm</span>
        </div>
      </div>
    </div>
  ) : (
    <h1>No posts</h1>
  );
};

export default Post;

