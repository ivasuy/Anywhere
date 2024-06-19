import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { RxHamburgerMenu } from "react-icons/rx";

import "./drawerRight.scss";
import UserDetailsCard from "../userDetailsCard/UserDetailsCard";
import UserCardAndPhotos from "../userCardAndPhotos/UserCardAndPhotos";
import SuggestedUsers from "../suggestedUsers/SuggestedUsers";
import { useDispatch, useSelector } from "react-redux";

const DrawerRight = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <div id="drawerRight">
      <div id="hamburgerIcon">
        <RxHamburgerMenu
          onClick={toggleDrawer}
          size={50}
          style={{ color: "rgb(0, 110, 255)" }}
        />
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
        enableOverlay={false}
        lockBackgroundScroll={false}
        size={390}
        style={{ zIndex: 2, backgroundColor: "rgba(0, 0, 0, 0.90)" }}
      >
        <div id="drawerContent">
          <div id="topNavDrawer">
            <h1>Anywhere</h1>
          </div>

          <div id="bottomRightMyFeedDrawer">
            {/* <UserDetailsCard /> */}
            {user && <UserCardAndPhotos self={true} user={user} />}
            <hr />
            <div id="suggestedUsers">
              <h1>Suggested Users</h1>
              <div id="userList">
                <SuggestedUsers />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerRight;
