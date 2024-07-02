import React, { useState } from 'react';
import './switchPosts.scss';

import Post from "../../../components/post/Post"

import userFace from "../../../assets/userFace.jpg"

const SwitchPosts = () => {
    const [activeTab, setActiveTab] = useState('public');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const postData = {
        content: [
            {
                type: "image",
                src: userFace,
            },
            {
                type: "image",
                src: userFace,
            },
            {
                type: "image",
                src: userFace,
            },
            {
                type: "text",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnisaepe vitae autem rem corrupti, natus excepturi possimus liberonisi, ullam unde? Officia, deserunt laudantium voluptas suscipitrepellendus sapiente aliquam sit illum aliquid quisquam eiusofficiis sequi, accusantium mollitia perspiciatis aut omnis id?Sed deleniti sequi adipisci minus nemo sapiente voluptatenumquam saepe, asperiores, eaque totam culpa.Repellat enimimpedit nisi saepe ut quaerat voluptas.Illo ipsam atqueveritatis voluptatum facilis earum repellat veniam eveniet omnisducimus quasi labore sunt nostrum, velit officia vel vitae!Deserunt amet earum temporibus dicta, obcaecati quam delenitiipsum dolor, sit amet consectetur adipisicing elit. Magnisaepe vitae autem rem corrupti, natus excepturi possimus liberonisi, ullam unde? Officia, deserunt laudantium voluptas suscipitrepellendus sapiente aliquam sit illum aliquid quisquam eiusofficiis sequi, accusantium mollitia perspiciatis aut omnis id?Sed deleniti sequi adipisci minus nemo sapiente voluptatenumquam saepe, asperiores, eaque totam culpa.Repellat enimimpedit nisi saepe ut quaerat voluptas.Illo ipsam atqueveritatis voluptatum facilis earum repellat veniam eveniet omnisducimuus dicta, obcaecati quam deleniti",
            },
        ],

        caption: "A beautiful face!",
    };

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
                        {/* Render public posts here */}

                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                    </div>
                ) : (
                    <div className='private-posts'>
                        {/* Render private posts here */}
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                        <Post data={postData} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SwitchPosts;
