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

  const [requestFlag, setrequestFlag] = useState(false)
  const [request_senderFlag, setrequest_senderFlag] = useState(false)
  const [chumFlag, setChumFlag] = useState(false)


  const ChumStatus = ({ request, request_sender, chum, handleSendChumRequest, handleAcceptChumRequest, handleRemoveChum, handleDeleteChumRequest }) => {
    if (request && request_sender) {
      return <button id="deleteChumR" onClick={handleDeleteChumRequest}>Delete Chum Request</button>;
    }

    if (request && !request_sender) {
      return <button onClick={handleAcceptChumRequest} id="acceptChumR">Accept Chum Request</button>;
    }

    if (chum) {
      return <button onClick={handleRemoveChum} id="removeChum">Remove Chum</button>;
    }


    return <button onClick={handleSendChumRequest} id="sendChumR">Send Chum Request</button>;
  };

  const getPurposeRequest = async (purpose) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };

      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/purpose-request`, {
        userId: user._id,
        purpose
      }, config);

      // console.log(data);
      return data.request;

    } catch (error) {
      // console.log("Error occurred in getting request:", error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  }

  const handleRemoveChum = async (e) => {
    e.preventDefault();

    try {

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };

      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/delete-chum`, {
        userId: user._id,
      }, config);

      fetchCount();// Assuming this updates the UI
      checkChumStatus()

    } catch (error) {
      console.log("Error occurred in deleting request:", error.message);
    }
  }

  const handleDeleteChumRequest = async (e) => {
    e.preventDefault();

    try {
      const request = await getPurposeRequest("delete");

      if (!request) {
        console.log("No request found for deletion.");
        return;
      }

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };

      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/accept-chum-request`, {
        requestId: request._id,
        accept: false
      }, config);


      fetchCount();// Assuming this updates the UI
      checkChumStatus()

    } catch (error) {
      console.log("Error occurred in deleting request:", error.message);
    }
  }

  const handleAcceptChumRequest = async (e) => {
    e.preventDefault();

    const request = await getPurposeRequest("accept");

    const requestId = request._id

    try {
      console.log("accept id", requestId);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };

      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/request/accept-chum-request`, {
        requestId: requestId,
        accept: true
      }, config);

      fetchCount();
      checkChumStatus()

    } catch (error) {
      console.log("error occured in accepting request", error.message)
    }

  }


  const fetchCount = async () => {
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
      setcheckBehold(true); // Update the state directly

      fetchCount(user); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  };

  const checkBeholdUser = async () => {
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

      setcheckBehold(false);

      fetchCount(); // Update the count after a successful "behold" request
    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }

  }

  const checkChumStatus = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/request/status`,
        { userId: user._id },
        config
      );



      const { request, request_sender, chum, userId } = data;

      setrequestFlag(request);
      setrequest_senderFlag(request_sender);
      setChumFlag(chum);

      fetchCount();

    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);
    }
  }


  const handleSendChumRequest = async (e) => {
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


      if (data.success) {
        setcheckChum(!checkChum);
      }


      fetchCount(); // Update the count after a successful "chum" request
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


    } catch (error) {
      console.log("error", error.response?.data?.message || error.message);

    }
  }

  useEffect(() => {
    // if (user) {
    console.log("lode ka fetch count")
    fetchCount();
    checkBeholdUser();
    checkChumStatus();
    // }
  }, [checkBehold, checkChum, requestFlag, request_senderFlag, chumFlag]);


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
            <Link>chum with {count.countChumListUsers || 0} users</Link>
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
            <ChumStatus
              request={requestFlag}
              request_sender={request_senderFlag}
              chum={chumFlag}
              handleSendChumRequest={handleSendChumRequest}
              handleAcceptChumRequest={handleAcceptChumRequest}
              handleRemoveChum={handleRemoveChum}
              handleDeleteChumRequest={handleDeleteChumRequest}
            />
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
