import React, { useEffect, useState } from 'react';
import './switchPosts.scss';

import Post from "../../../components/post/Post"

import userFace from "../../../assets/userFace.jpg"
import axios from 'axios';
import { useParams } from 'react-router-dom';




const SwitchPosts = () => {

    const { id } = useParams();

    const [activeTab, setActiveTab] = useState('public');

    const [publicPosts, setPublicPosts] = useState([]);
    const [privatePosts, setPrivatePosts] = useState([]);



    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const getUserPosts = async () => {
        try {

            const config = {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            };

            const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/post/user-profile/posts`, { id }, config);

            const { publicPosts, privatePosts } = data;

            setPrivatePosts(privatePosts);
            setPublicPosts(publicPosts);

            console.log("this is data in frontend", data)

        } catch (error) {
            console.log("error: ", error)
        }
    }


    useEffect(() => {
        getUserPosts();
    }, [])

    return (
        <div id='switchPosts'>
            <h1>
                Posts
            </h1>
            <div className='top-menu'>
                <div
                    className={`menu-item ${activeTab === 'public' ? 'active' : ''}`}
                    onClick={() => handleTabClick('public')}
                >
                    Public Posts
                </div>
                <div
                    className={`menu-item ${activeTab === 'private' ? 'active' : ''}`}
                    onClick={() => handleTabClick('private')}
                >
                    Private Posts
                </div>
            </div>
            <div className='posts'>
                {activeTab === 'public' ? (
                    <div className='public-posts'>
                        {publicPosts && publicPosts.length !== 0 ? publicPosts.map((post, index) => (
                            <Post key={index} data={post} />
                        )) : (
                            <h1>No public posts</h1>
                        )}
                    </div>
                ) : (
                    <div className='private-posts'>
                        {privatePosts ? privatePosts.map((post, index) => (
                            <Post key={index} data={post} />
                        )) : (
                            <h1>No private posts</h1>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default SwitchPosts;
