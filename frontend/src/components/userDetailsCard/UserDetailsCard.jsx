import React, { useEffect, useState } from "react";
import "./userDetailsCard.scss";
import { Link, useNavigate } from "react-router-dom";
import userFace from "../../assets/userFace.jpg";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import axios from "axios";
import { useAlert } from "react-alert";


const UserDetailsCard = ({ self, user }) => {

  const navigate = useNavigate();
  const alert = useAlert();

  const [count, setCount] = useState({});
  const [checkBehold, setcheckBehold] = useState(false);
  const [checkChum, setcheckChum] = useState(false);


  const fetchCount = async (user) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/all-count`,
        { userId: user._id },
        config
      );
      setCount(data.count);
      // console.log(user);
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  };

  const handleBeholdUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/behold`,
        { userId: user._id },
        config
      );
      // console.log("success", data.message);
      setcheckBehold(true); // Update the state directly

      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  };

  const checkBeholdUser = async (user) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/check-behold`,
        { userId: user._id },
        config
      );
      // console.log("success", data.isInBeholdList);
      setcheckBehold(data.isInBeholdList);
      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  }

  const handleUndoBehold = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/remove-behold`,
        { userId: user._id },
        config
      );
      // console.log("success", data.message);
      setcheckBehold(false);

      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }

  }


  const handleChumRequest = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/send-chum-request`,
        { userId: user._id },
        config
      );
      // console.log("success", data.message);

      if (data.success) {
        setcheckChum(!checkChum);
      }


      fetchCount(user); // Update the count after a successful "chum" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  }

  const handleCreateChat = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/chat/new-single-chat`,
        { userId: user._id },
        config
      );

      // console.log(data.chat);
      // if (data.chat) {
      //   localStorage.setItem('reloadOnChatCreate', 'true');

      // }

    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);

    }
  }

  useEffect(() => {
    if (user) {
      fetchCount(user);
      checkBeholdUser(user);
    }
  }, [user, checkBehold]);

  return (
    <div id="UserDetailsCard">
      <div id="topUserDetailsCard">
        <div id="imageAndName">
          <img src={user?.avatar || userFace} alt="User Avatar" />
          <Link>
            {user && <h1>{user.name}</h1>}
          </Link>
          {!self && (
            <div id="composeMessageIcon" onClick={handleCreateChat}>
              {user && <Link to={`/home/chat`}>
                <BiSolidMessageRoundedAdd size={30} style={{ color: "white" }} />
              </Link>}

            </div>
          )}
        </div>
        <div id="credDetails">
          <div>
            <Link>beheld by {count.countBeheldByOthers || 0} users</Link>
          </div>
          <div>
            <Link>beholds {count.countBeholdListUsers || 0} users</Link>
          </div>
          <div>
            <Link>chum with {count.chumCount || 0} users</Link>
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
            {!checkBehold ? <button onClick={handleBeholdUser}>behold</button> : <button onClick={handleUndoBehold} id="undoBeholdButton">Undo behold</button>}
            {!checkChum ? <button onClick={handleChumRequest}>chum request</button> : <button onClick={handleUndoBehold} id="undoBeholdButton">Chum request sent</button>}
            {/* <button onClick={handleChumRequest}>chum request</button> */}
          </div>
        </div>
      )}
      {user && <Link to={`/user/${user._id}`}>
        <div id="exploreUserButton">
          <button>Explore User</button>
        </div>
      </Link>}
    </div>
  );
};

export default UserDetailsCard;
