import React, { useEffect, useState } from "react";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import PersonIcon from '@material-ui/icons/Person';

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Carousel1 from "../carousels/carousel1/Carousel1";
// import { usernameValidator } from "../../utils/validators";



const Login = () => {

    const alert = useAlert();

    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            alert.success("User Logged in Successfully");
            navigate("/");
        }
    }, [dispatch, error, alert, navigate, isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("reaches here");
        dispatch(login(username, password));
        console.log("login form submitted");
    }


    return (
        <div className="loginRegisterContainer">
            <div id="loginForm">
                <div id="loginHead">
                    <h1>Anywhere</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Login in to Anywhere</h1>
                    <div id="loginUsername">
                        <PersonIcon size={25} />
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    <div id="loginPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    <div id="forgotpass" >
                        <Link to="/password/forgot" style={{ color: "white" }}>Forgot Password ?</Link>
                    </div>
                    <input type="submit" value="Login" id="loginBtn" />
                </form>
            </div>
            <div id="loginImage">
                <h1>Nearby users</h1>

                <Carousel1 />
            </div>
        </div>
    );
};

export default Login;
