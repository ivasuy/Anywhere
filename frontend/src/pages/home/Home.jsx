import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeLoader from "../../components/HomeLoader/HomeLoader";

// import "./home.scss"

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        navigate("/my-feed");
      }, 10000);
    } else {
      setTimeout(() => {
        navigate("/login-redirect");
      }, 10000);
    }
  }, [isAuthenticated]);

  return (
    <div id="home">
      {/* <h1>Anywhere</h1> */}
      <HomeLoader />
    </div>
  );
};

export default Home;
