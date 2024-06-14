import React from "react";
import userFace from "../../assets/userFace.jpg";
import UserDetailsCard from "../userDetailsCard/UserDetailsCard";
import "./userCardAndPhotos.scss";

const UserCardAndPhotos = () => {
  return (
    <div id="userCardAndPhotos">
      <div id="userCard">
        <UserDetailsCard />
      </div>
      <div id="userImages">
        <img src={userFace} alt="" />
      </div>
      <div id="userImages">
        <img src={userFace} alt="" />
      </div>
      <div id="userImages">
        <img src={userFace} alt="" />
      </div>
    </div>
  );
};

export default UserCardAndPhotos;
