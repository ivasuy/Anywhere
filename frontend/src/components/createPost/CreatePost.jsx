import React, { useEffect, useState } from "react";
import "./createPost.scss";
import { FaTimes, FaShare } from "react-icons/fa";
import UserList from '.././usersList/UsersList'; // Make sure you import your UserList component
import ChumList from "../chumList/ChumList"; // Import ChumList component

const CreatePost = ({ setCreatePostPermission, accessFlag }) => {
    const [post, setPost] = useState({
        selectedFiles: [],
        caption: "",
        accessibility: "public",
        sharedWith: []
    });
    const [showUserList, setShowUserList] = useState(false);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setPost((prev) => ({
            ...prev,
            selectedFiles: files
        }));
    };

    const handleCaptionChange = (event) => {
        setPost((prev) => ({
            ...prev,
            caption: event.target.value
        }));
    };

    const handlePublicPostSubmit = () => {
        setShowUserList(true); // Show the user list view
    };

    const handleCustomButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    const onClose = () => {
        setCreatePostPermission(false);
    };

    const handleAccessibilityChange = (event) => {
        setPost((prev) => ({
            ...prev,
            accessibility: event.target.value
        }));
    };

    const renderFilePreview = (file) => {
        const fileType = file.type.split('/')[0];

        switch (fileType) {
            case 'image':
                return <img src={URL.createObjectURL(file)} alt="preview" className="preview-image" />;
            case 'video':
                return <video src={URL.createObjectURL(file)} controls className="preview-video" />;
            case 'audio':
                return <audio src={URL.createObjectURL(file)} controls className="preview-audio" />;
            default:
                return <p>Unsupported file type</p>;
        }
    };

    useEffect(() => {
        console.log("accessFlag:", accessFlag);
    }, [accessFlag]);

    return (
        <div className="create-post-overlay">
            <div className={`create-post-container ${showUserList ? 'slide-out' : 'slide-in'}`}>
                <button className="close-button" onClick={onClose}>
                    <FaTimes style={{ color: "white" }} />
                </button>
                {!showUserList ? (
                    <>
                        <h2>Create Post</h2>
                        <textarea
                            placeholder="Express your thoughts"
                            value={post.caption}
                            onChange={handleCaptionChange}
                            className="caption-input"
                        ></textarea>
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        <button className="custom-file-button" onClick={handleCustomButtonClick}>
                            Attach media files
                        </button>
                        <div id="fileDisclaimer">
                            <span>It's all right if you don't want to share media files. You can just express your thoughts.</span>
                        </div>

                        <div className="preview-container">
                            {post.selectedFiles.map((file, index) => (
                                <div key={index} className="preview-item">
                                    {renderFilePreview(file)}
                                </div>
                            ))}
                        </div>

                        <div id="RadioButtons">
                            <p>Select post accessibility:</p>
                            <label>
                                <input
                                    type="radio"
                                    name="accessibility"
                                    value="public"
                                    checked={post.accessibility === "public"}
                                    onChange={handleAccessibilityChange}
                                />
                                Public
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="accessibility"
                                    value="private"
                                    checked={post.accessibility === "private"}
                                    onChange={handleAccessibilityChange}
                                    disabled={!accessFlag}
                                />
                                Private
                            </label>
                        </div>
                        <div className="accessDisclaimer">
                            {!accessFlag && <span>The private posts cannot be shared from this section. If you want to make a post private then you need to do it manually from user page.</span>}
                        </div>

                        <button onClick={handlePublicPostSubmit} className="submit-button">
                            <FaShare /> Share with
                        </button>
                    </>
                ) : (
                    accessFlag ? <ChumList post={post} setShowUserList={setShowUserList} setCreatePostPermission={setCreatePostPermission} /> : <UserList post={post} setShowUserList={setShowUserList} setCreatePostPermission={setCreatePostPermission} />
                )}
            </div>
        </div>
    );
};

export default CreatePost;
