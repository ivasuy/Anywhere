import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./userDetailsCard.scss";
import { Link } from "react-router-dom";
import userFace from "../../assets/userFace.jpg";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";

const UserDetailsCard = (self) => {
  const user = useSelector((state) => state.user);
  const { avatar } = user.user;

  // useEffect(() => {
  //   console.log("User details:", user.user);
  // }, [user]);

  return (
    <div id="UserDetailsCard">
      <div id="topUserDetailsCard">
        <div id="imageAndName">
          <img src={avatar || userFace} alt="User Avatar" />
          <Link>
            <h1>{user.user.name}</h1>
          </Link>
          <div id="composeMessageIcon">
            <BiSolidMessageRoundedAdd size={30} />
          </div>
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
      {self && (
        <div id="bottomUserCardDetails">
          <div id="buttonsbottomUserCardDetails">
            <button>behold</button>
            <button>chum request</button>
          </div>
          <div id="exploreUserButton">
            <button>Explore User</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsCard;
