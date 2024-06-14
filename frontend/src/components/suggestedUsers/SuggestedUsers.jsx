import React from "react";
import UserCardAndPhotos from "../userCardAndPhotos/UserCardAndPhotos";
import "./suggestedUsers.scss";

const SuggestedUsers = () => {
  return (
    <div id="suggestedUsers">
      <div id="suggestedUser">
        <UserCardAndPhotos />
      </div>
      <div id="suggestedUser">
        <UserCardAndPhotos />
      </div>
      <div id="suggestedUser">
        <UserCardAndPhotos />
      </div>
      <div id="suggestedUser">
        <UserCardAndPhotos />
      </div>
    </div>
  );
};

export default SuggestedUsers;
