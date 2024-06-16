import React from "react";
import "./warning.scss";

const Warning = ({ onAgree, onDisagree }) => {
  return (
    <div className="warning-overlay">
      <div className="warning-container">
        <h1>Disclaimer !</h1>
        <p>
          If you post any NSFW content or anything that might harm others and
          are found guilty, your phone number and all accounts connected to that phone number will be permanently banned and
          necessary legal action can be taken in serious situations. Do you confirm that you will not
          post any such content?
        </p>
        <div className="warning-buttons">
          <button className="warning-button" onClick={onAgree}>
            Yes
          </button>
          <button className="warning-button" onClick={onDisagree}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
