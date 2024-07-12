
import React, { useEffect, useState } from "react";
import "./userProfile.scss";
import FloatingNav from "../../components/floatingNav/FloatingNav";
import Metadata from "../../components/layout/metadata/Metadata";
import userFace from "../../assets/userFace.jpg";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import SwitchPosts from "./SwitchPosts/SwitchPosts";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Warning from "../../components/Warning/Warning";
import CreatePost from "../../components/createPost/CreatePost";
import axios from "axios";

const UserProfile = () => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [warning, setWarning] = useState(false);
    const [createMessageFlag, setCreateMessageFlag] = useState(false);
    const [createPostPermission, setCreatePostPermission] = useState(false);
    const [count, setCount] = useState({})


    const { user } = useSelector((state) => state.user);

    const [self, setself] = useState(false);

    const { id } = useParams();


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


    const handleScroll = (e) => {
        if (e.target.scrollTop > 0) {
            setIsScrollable(true);
        } else {
            setIsScrollable(false);
        }
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

    useEffect(() => {

        if (user._id === id) {
            setself(true);
        }

        fetchCount()

    }, [self])



    return (
        <div
            id="userProfile"
            onScroll={handleScroll}
            style={{ overflowY: "scroll", height: "100vh" }}
        >
            <Metadata title="My Profile" />

            <div id="logo">
                <h3>Anywhere</h3>
            </div>
            <div className={isScrollable ? "top-userProfile scrollable" : "top-userProfile"}>
                <div id="top-left-userProfile">
                    <img src={userFace} alt="User Face" />
                    <div id="userName-occupation">
                        <span id="userName-userProfile">@ani_gonda</span>
                        <span id="user-occupation" className="bioItems">Software Developer</span>
                    </div>
                    <div id="user-about" className="bioItems">
                        Don't forget my name because you'll be screaming it tonight.
                    </div>
                    {!self && <div id="buttons-userProfile">
                        <button>Behold</button>
                        <button>Chum Request</button>
                    </div>}
                    <div id="user-SocialMedia">
                        <div id="socialMediaIcon">
                            <FaInstagram size={22} />
                        </div>
                        <div id="socialMediaIcon">
                            <RiTwitterXLine size={22} />
                        </div>
                        <div id="socialMediaIcon">
                            <FaLinkedin size={22} />
                        </div>
                    </div>
                </div>

                <div id="top-right-userProfile">
                    <div id="userCred-top-right-userProfile">
                        <div className="userCredAll">beheld by {count.countBeheldByOthers || 0} users</div>
                        <div className="userCredAll">beholds {count.countBeholdListUsers || 0} users</div>
                        <div className="userCredAll">chums with {count.countChumListUsers || 0}</div>
                        <div className="userCredAll" id="user-channels">Follows 81 channels</div>
                        <div className="userCredAll" id="user-channels">887 posts</div>
                    </div>
                    <div id="userBio">
                        <div id="user-interests" className="bioItems">
                            <div>football</div>
                            <div>gym</div>
                            <div>coding</div>
                        </div>
                    </div>

                    {self && <div id="profile-buttons">
                        <button id="createPost" onClick={() => {
                            setWarning(true);
                            setCreateMessageFlag(false);
                        }}>Create Post</button>
                        <button id="createPost">Edit Profile</button>
                    </div>}
                </div>
            </div>

            {warning && (
                <div id="warning">
                    <Warning onAgree={handleAgree} onDisagree={handleDisagree} />
                </div>
            )}
            {!warning && createPostPermission && (
                <div id="createPost">
                    <CreatePost setCreatePostPermission={setCreatePostPermission} accessFlag={true} />
                </div>
            )}

            <div id="bottom-userProfile">
                <SwitchPosts />
            </div>

            <FloatingNav />
        </div>
    );
};

export default UserProfile;

