import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRedirect from "./pages/LoginRedirect/LoginRedirect";
import "./App.css"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store"
import MyFeed from "./pages/Myfeed/MyFeed";
import ExploreNearby from "./pages/ExploreNearby/ExploreNearby";
import ExploreWorld from "./pages/ExploreWorld/ExploreWorld";
import Myself from "./pages/Myself/Myself";
import { useDispatch, useSelector } from "react-redux";
import ProtectRoute from "./components/auth/ProtectRoute";
import NotFound from "./pages/notFound/NotFound";
import ChatNearby from "./pages/ChatNearby/ChatNearby";
import { fetchCoords } from './utils/fetchCoords';
import { update_user_location } from './actions/locationAction';


function App() {



  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser());

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
    fetchCoords(options)
      .then((cleanup) => {
        // Success - you can store the cleanup function to call it later
        // console.log("bhainse ka ", cleanup())
        cleanup();
      })
      .catch((error) => {
        console.log("Error occurred during fetchCoords", error);
      });

  }, [])


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login-redirect" element={<LoginRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/my-feed" element={<MyFeed />} />
        <Route path="/explore-nearby" element={<ExploreNearby />} />
        <Route path="/explore-world" element={<ExploreWorld />} />
        <Route path="/myself" element={<Myself />} />

        <Route path="/chat-nearby" element={<ChatNearby />} />



        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
