import React from 'react'
import "./chatMembers.scss"



import userFace from "../../../../assets/userFace.jpg"

const ChatMembers = ({ selectedChat }) => {
    return (
        <div id="chatMembers">
            <div id="chatMembers-heading">
                23 Members
            </div>

            <div id="chatMembersList">
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>
                    <div>admin</div>
                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>haathi ram</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
                <div id="chatMembersItem" key="">
                    <img src={userFace} alt="user" />
                    <span>arvind mera saathi</span>

                </div>
            </div>

        </div >
    )
}

export default ChatMembers