import React, { useState, useEffect } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import PersonIcon from "@material-ui/icons/Person";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Carousel1 from "../carousels/carousel1/Carousel1";
import "./register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const { name, email, username, password } = user;

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("username", username);
    myForm.set("password", password);

    console.log("register form submitted");
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      // navigate("/account");
      alert.success("User Registered Successfully");
      navigate("/");
    }
  }, [dispatch, error, alert, navigate, isAuthenticated]);

  return (
    <div className="loginRegisterContainer">
      <div id="loginForm">
        <div id="loginHead">
          <h1>Anywhere</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Register on Anywhere</h1>
          <div id="loginUsername">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            // value={loginEmail}
            // onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div id="loginUsername">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            // value={loginEmail}
            // onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div id="loginUsername">
            <PersonIcon />
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              value={username}
              onChange={registerDataChange}
            // value={loginEmail}
            // onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div id="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            // value={loginPassword}
            // onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Register" id="loginBtn" />
        </form>
      </div>
      <div id="loginImage">
        <h1>Nearby users</h1>
        {/* <Carousel1 /> */}
      </div>
    </div>
  );
};

export default Register;
