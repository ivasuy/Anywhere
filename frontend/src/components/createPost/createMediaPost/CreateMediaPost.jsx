import React, { useState } from "react";
import "./createMediaPost.scss";
import { FaTimes } from "react-icons/fa";
import { FaShare } from "react-icons/fa";


const CreateMediaPost = ({ setCreatePostPermission }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [caption, setCaption] = useState("");

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleSubmit = () => {
        // Logic for handling the submission
        console.log("Files: ", selectedFiles);
        console.log("Caption: ", caption);
        // Further actions can be added here
    };

    const handleCustomButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    const onClose = () => {
        setCreatePostPermission(false);
    }

    return (
        <div className="create-post-overlay">
            <div className="create-post-container">
                <button className="close-button" onClick={onClose}>
                    <FaTimes style={{ color: "white" }} onClick={onClose} />
                </button>
                <h2>Create Post</h2>
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button className="custom-file-button" onClick={handleCustomButtonClick}>
                    Choose Files
                </button>
                <div className="preview-container">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="preview-item">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                className="preview-image"
                            />
                        </div>
                    ))}
                </div>
                <textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                    className="caption-input"
                ></textarea>
                <button onClick={handleSubmit} className="submit-button">
                    <FaShare /> Share with
                </button>
            </div>
        </div>
    );
};

export default CreateMediaPost;
