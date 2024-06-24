import React from 'react'
import "./chatFiles.scss"
import AccordionUsage from './Accordion'

const ChatFiles = ({ selectedChat }) => {
    return (
        <div id='chatFiles'>
            <div id="chatFiles-heading">
                Chat Info
            </div>
            <div id="chatFiles-subHeading">
                Files
            </div>
            <div id="chatFiles-data">
                <AccordionUsage />
            </div>
        </div>
    )
}

export default ChatFiles