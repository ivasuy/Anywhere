import React from 'react'
import Header from './Header/Header'
import Title from '../shared/Title/Title'

const AppLayout = () => WrappedComponent => {
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

export default AppLayout