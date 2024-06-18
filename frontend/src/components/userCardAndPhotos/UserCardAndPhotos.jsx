import React, { useEffect } from "react";
import userFace from "../../assets/userFace.jpg";
import UserDetailsCard from "../userDetailsCard/UserDetailsCard";
import "./userCardAndPhotos.scss";

const UserCardAndPhotos = ({ self, user }) => {


  return (
    <div id="userCardAndPhotos">
      <div id="userCard">
        <UserDetailsCard self={self} user={user} />
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
