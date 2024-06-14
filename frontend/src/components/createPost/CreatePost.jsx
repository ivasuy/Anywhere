import React, { useState } from "react";
import "./createPost.scss";
import { FaTimes } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

const CreatePost = ({ setCreatePostPermission, accessFlag }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [caption, setCaption] = useState("");
    const [accessibility, setAccessibility] = useState("public");

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
        console.log("Accessibility: ", accessibility);
        // Further actions can be added here
    };

    const handleCustomButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    const onClose = () => {
        setCreatePostPermission(false);
    };

    const handleAccessibilityChange = (event) => {
        setAccessibility(event.target.value);
    };

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
                    placeholder="Express your thoughts"
                    value={caption}
                    onChange={handleCaptionChange}
                    className="caption-input"
                ></textarea>

                <div id="RadioButtons">
                    <p>Select post accessibility:</p>
                    <label>
                        <input
                            type="radio"
                            name="accessibility"
                            value="public"
                            checked={accessibility === "public"}
                            onChange={handleAccessibilityChange}
                        />
                        Public
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="accessibility"
                            value="private"
                            checked={accessibility === "private"}
                            onChange={handleAccessibilityChange}
                            disabled={!accessFlag}
                        />
                        Private
                    </label>
                </div>
                <div className="accessDisclaimer">
                    {!accessFlag && <span>The private posts cannot be shared from this section. If you have to make a post private then you need to do it manually afterwards from user Page.</span>}
                </div>

                <button onClick={handleSubmit} className="submit-button">
                    <FaShare /> Share with
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
