import React from "react";
import "./loginRedirect.scss";
import { Link } from "react-router-dom";
import HomeLoader from "../../components/HomeLoader/HomeLoader"


const LoginRedirect = () => {

    return (
        <div id="loginPage">

            <div id="mid">

                <h1>Anyone, Anywhere</h1>
                <Link to="/register">
                    <button id="signupBut">
                        Sign up to Anywhere
                    </button>
                </Link>

                <div>or</div>
                <Link to="/login">
                    <button >Login to Anywhere</button>
                </Link>

                <p>
                    By creating an account you agree with our Terms of Service, Privacy
                    Policy, and our default Notification Settings.
                </p>
            </div>
            <div id="right">
                <span>Anywhere</span>

                {/* <HomeLoader /> */}
            </div>
        </div>
    );
};

export default LoginRedirect;
