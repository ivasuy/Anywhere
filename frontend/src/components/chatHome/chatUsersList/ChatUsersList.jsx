import React, { useEffect, useState } from 'react'

import { CiSearch } from "react-icons/ci";
import userFace from "../../../assets/userFace.jpg";

import { SlOptions } from "react-icons/sl";

import { useAlert } from "react-alert";
import { IoIosRefresh } from "react-icons/io";



import "./chatUsersList.scss"
import { useSelector } from 'react-redux';

const ChatUsersList = ({ chatType, onSelectChat }) => {
    const [activeUser, setActiveUser] = useState(null);

    const { fetchedChats } = useSelector((state) => state.all_chats)
    const { user } = useSelector((state) => state.user);

    const alert = useAlert();


    const handleUserClick = (userId) => {
        setActiveUser(userId);
    };




    return (
        <div id='chatUsers'>
            <div id="chatUsersSearch">
                <CiSearch size={35} color='black' />
                <input type="text" placeholder="Search" />
            </div>
            <div id="refreshChatList" onClick={() => window.location.reload()}>
                <IoIosRefresh size={20} />
                <div>Refresh</div>
            </div>
            <div id="chatUsersList">

                {fetchedChats.length ? (
                    fetchedChats.map((chat, index) => {
                        const isGroupChat = chat.groupChat;
                        let name, avatar;

                        if (isGroupChat) {
                            name = chat.name;
                            avatar = chat.avatar?.url;
                        } else {
                            const otherMember = chat.members.find(member => member._id !== user._id); // Assuming `user._id` is the current user's ID
                            name = otherMember?.name;
                            avatar = otherMember?.avatar?.url;
                        }

                        return (
                            <div key={index} id="userChat" className={activeUser === chat._id ? 'active' : ''}
                                onClick={() => {
                                    handleUserClick(chat._id)
                                    onSelectChat(chat)
                                }}>

                                <img src={avatar || userFace} alt="user" /> {/* defaultAvatar can be a placeholder image */}

                                <div id="nameNmsg">
                                    <div>{name}</div>
                                    <span>This is a message..</span>
                                </div>

                                <div id="otherMetaDataChat">
                                    <span>4m</span>
                                    <div id="pinNnotification">
                                        <SlOptions size={20} color='yellow' />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div id='nochats'>{chatType === 'groups' ? 'No groups to display' : 'No chats to display'}</div>
                )}








                {/* <div id="userChat" className={activeUser === 2 ? 'active' : ''}
                    onClick={() => handleUserClick(2)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 3 ? 'active' : ''}
                    onClick={() => handleUserClick(3)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 4 ? 'active' : ''}
                    onClick={() => handleUserClick(4)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 5 ? 'active' : ''}
                    onClick={() => handleUserClick(5)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 6 ? 'active' : ''}
                    onClick={() => handleUserClick(6)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 7 ? 'active' : ''}
                    onClick={() => handleUserClick(7)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 8 ? 'active' : ''}
                    onClick={() => handleUserClick(8)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 9 ? 'active' : ''}
                    onClick={() => handleUserClick(9)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 10 ? 'active' : ''}
                    onClick={() => handleUserClick(1)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 10 ? 'active' : ''}
                    onClick={() => handleUserClick(1)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 11 ? 'active' : ''}
                    onClick={() => handleUserClick(11)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div>





                <div id="userChat" className={activeUser === 12 ? 'active' : ''}
                    onClick={() => handleUserClick(12)}>

                    <img src={userFace} alt="user" />

                    <div id="nameNmsg">
                        <div>John Doe</div>
                        <span>This is a message..</span>
                    </div>

                    <div id="otherMetaDataChat">
                        <span>4m</span>
                        <div id="pinNnotification">
                            <SlOptions size={20} color='yellow' />
                        </div>
                    </div>
                </div> */}



            </div>


        </div>
    )
}

export default ChatUsersList