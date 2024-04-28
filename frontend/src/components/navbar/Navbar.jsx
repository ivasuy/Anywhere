import React, { useEffect } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "./navbar.scss"
import { useSelector } from 'react-redux';
import UserOptions from '../userOptions/UserOptions';

const Navbar = () => {

    const { isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    // useEffect(() => {
    //     console.log(user.name);
    // }, [])


    return (
        <div id="navbar">
            <div id="left">

                {isAuthenticated ? <UserOptions />
                    :
                    <Link to="/login-redirect">
                        <AiOutlineUser size={35} />
                    </Link>
                }
            </div>

            <div id="right">
                <h1>Noti.fy</h1>
            </div>
        </div>
    )
}

export default Navbar