// import React, { useEffect, useState } from "react";
// import "./userProfile.scss";
// import FloatingNav from "../../components/floatingNav/FloatingNav";
// import Metadata from "../../components/layout/metadata/Metadata";
// import userFace from "../../assets/userFace.jpg";
// import { FaInstagram } from "react-icons/fa6";
// import { RiTwitterXLine } from "react-icons/ri";
// import { FaLinkedin } from "react-icons/fa";
// import { GoPlus } from "react-icons/go";
// import SwitchPosts from "./SwitchPosts/SwitchPosts";

// const UserProfile = () => {
//     const [isScrollable, setIsScrollable] = useState(false);

//     const handleScroll = (e) => {
//         const scrollPosition = window.scrollY;
//         if (e.target.scrollTop > 0) {
//             setIsScrollable(true);
//         } else {
//             setIsScrollable(false);
//         }
//     };

//     return (
//         <div
//             id="userProfile"
//             onScroll={handleScroll}
//             style={{ overflowY: "scroll", height: "100vh" }}
//         >
//             <Metadata title="My Profile" />

//             <div id="logo">
//                 <h3>Anywhere</h3>
//             </div>
//             <div
//                 className={
//                     isScrollable ? "top-userProfile scrollable" : "top-userProfile"
//                 }
//             >
//                 <div id="top-left-userProfile">
//                     <img src={userFace} alt="" />
//                     <div id="userName-occupation">
//                         <span id="userName-userProfile">@ani_gonda</span>
//                         <span id="user-occupation" className="bioItems">student</span>
//                     </div>
//                     <div id="user-about" className="bioItems">
//                         Don't forget my name because you'll be screaming it tonight.
//                     </div>
//                     <div id="buttons-userProfile">
//                         <button>Behold</button>
//                         <button>Chum Request</button>
//                     </div>
//                     <div id="user-SocialMedia">
//                         <div id="socialMediaIcon">
//                             <FaInstagram size={22} />
//                         </div>
//                         <div id="socialMediaIcon">
//                             <RiTwitterXLine size={22} />
//                         </div>
//                         <div id="socialMediaIcon">
//                             <FaLinkedin size={22} />
//                         </div>
//                     </div>
//                 </div>

//                 <div id="top-right-userProfile">
//                     <div id="userCred-top-right-userProfile">
//                         <div className="userCredAll">
//                             Beheld by 69 users
//                         </div>
//                         <div className="userCredAll">
//                             Beholds 67 users
//                         </div>
//                         <div className="userCredAll">
//                             Chum with 80 users
//                         </div>
//                         <div className="userCredAll" id="user-channels">
//                             Follows 81 channels
//                         </div>
//                     </div>
//                     <div id="userBio">
//                         <div id="user-interests" className="bioItems">
//                             <div>football</div>
//                             <div>gym</div>
//                             <div>gym</div>
//                             <div>gym</div>
//                             <div>gym</div>
//                             <div>gym</div>
//                             <div>gym</div>
//                         </div>
//                     </div>

//                     <div id="profile-buttons">

//                         <div id="createPost">
//                             Create Post
//                         </div>

//                         <div id="createPost">
//                             Edit Profile
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div id="bottom-userProfile">
//                 <SwitchPosts />
//             </div>

//             <FloatingNav />
//         </div>
//     );
// };

// export default UserProfile;


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

const UserProfile = () => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [warning, setWarning] = useState(false);
    const [createMessageFlag, setCreateMessageFlag] = useState(false);
    const [createPostPermission, setCreatePostPermission] = useState(false);


    const { user } = useSelector((state) => state.user);

    const [self, useself] = useState(false);

    const { id } = useParams();


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
            useself(true);
        }
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
                        <div className="userCredAll">Beheld by 69 users</div>
                        <div className="userCredAll">Beholds 67 users</div>
                        <div className="userCredAll">Chum with 80 users</div>
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

