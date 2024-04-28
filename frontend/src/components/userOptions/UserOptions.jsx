import React, { Fragment, useState } from "react";
import "./userOptions.scss";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";


const UserOptions = ({ user }) => {
    const [openDial, setOpenDial] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        // { icon: <ListAltIcon />, name: "Orders", func: orders },
        // { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    // if (user.role === "admin") {
    //     options.unshift({
    //         icon: <DashboardIcon />,
    //         name: "Dashboard",
    //         func: dashboard,
    //     });
    // }

    // function dashboard() {
    //     navigate("/admin/dashboard");
    // }

    // function orders() {
    //     navigate("/orders");
    // }

    // function account() {
    //     navigate("/account");
    // }

    function logoutUser() {
        dispatch(logout());
        navigate("/");
        window.location.reload();
        alert.success("Logout successfull");
    }

    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                // onClose={() => setOpenDial(false)}
                onClick={() => setOpenDial(!openDial)}
                // onOpen={() => setOpenDial(true)}
                open={openDial}
                direction="down"
                className="speedDial"
                icon={
                    <img className="speedDialIcon" src="https://picsum.photos/200/300" alt="Profile" />
                }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;
