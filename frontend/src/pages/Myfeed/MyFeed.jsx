import React from 'react';
import "./myfeed.scss"
import FloatingNav from '../../components/floatingNav/FloatingNav';
import Metadata from '../../components/layout/metadata/Metadata';

const MyFeed = () => {

    return (
        <div>
            <Metadata title="My Feed" />
            <div>MyFeed</div>
            <div><FloatingNav /></div>
        </div>
    );
};

export default MyFeed;
