import React, { useEffect } from "react";
import "./userDetailsCard.scss";
import { Link } from "react-router-dom";
import userFace from "../../assets/userFace.jpg";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import axios from "axios";

const UserDetailsCard = ({ self, user }) => {

  const handleBeholdUser = async (e) => {
    e.preventDefault();

    console.log("user To be beholded", user._id);

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/behold`,
      { userId: user._id }, // Pass the user ID in the request body
      config
    );

    console.log("success", data.message);
  }


  return (
    <div id="UserDetailsCard">
      <div id="topUserDetailsCard">
        <div id="imageAndName">
          <img src={user?.avatar || userFace} alt="User Avatar" />
          <Link>
            {user && <h1>{user.name}</h1>}
          </Link>
          {!self && <div id="composeMessageIcon">
            <BiSolidMessageRoundedAdd size={30} />
          </div>
          }
        </div>
        <div id="credDetails">
          <div>
            <Link>beheld by { }57 users</Link>
          </div>
          <div>
            <Link>beholds { }101 users</Link>
          </div>
          <div>
            <Link>chum with { }400 users</Link>
          </div>
        </div>
      </div>
      <div id="userBio">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          mollitia maxime eligendi, temporibus, laboriosam beatae, distinctio
          quia voluptate delectus sed excepturi enim animi cumque eum.
          Perspiciatis nam commodi fugit aliquid, hic quaerat, sed corporis
          amet, exercitationem natus accusamus vel deleniti? Dolore expedita
          repellendus eaque quam. Quo suscipit laborum fuga in!
        </span>
      </div>
      {!self && (
        <div id="bottomUserCardDetails">
          <div id="buttonsbottomUserCardDetails">
            <button onClick={handleBeholdUser}>behold</button>
            <button>chum request</button>
          </div>
        </div>
      )}
      <div id="exploreUserButton">
        <button>Explore User</button>
      </div>
    </div>
  );
};

export default UserDetailsCard;


