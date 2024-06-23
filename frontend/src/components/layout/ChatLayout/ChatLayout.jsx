import React from 'react'
import Header from '../Header/Header'
import Title from '..//Title/Title'

const ChatLayout = () => (WrappedComponent) => {
    return (props) => {

        return (
            <>
                <Title />
                <div><Header /></div>
                <WrappedComponent {...props} />
                <div>Header</div>
            </>
        )
    }
}

export default ChatLayout