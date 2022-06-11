import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { logoutAuth } from "../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  navbar: {
    display: "Flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameAvatar: {
    fontSize: "1em",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

const Navbar = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authR.userData);
  const handleFirstClick = () => {
    if (props.button1 === "Edit profile") {
      history.push("/profile");
    } else {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };
  const handleSecondClick = () => {
    if (props.button2 === "Logout") {
      dispatch(logoutAuth());
      history.push("/");
    } else {
      window.scrollTo(0, document.getElementById("about-us").scrollHeight);
    }
  };

  const userDataAfterUpdate = useSelector(
    (state) => state.editProfileReducer.userDataAfterUpdate
  );
  return (
    <AppBar position="static" color="default">
      <Toolbar className={classes.navbar}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "25vw",
            justifyContent: "space-around",
          }}
        >
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Link to={userData ? `/${userData?.type}/dashboard` : "/"}>
              <img src={logo} alt="logo" width="100" height="50" />
            </Link>
          </IconButton>
          <h3 style={{ display: "flex", alignSelf: "center" }}>
            My Best Nanny
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "25vw",
            justifyContent: "space-around",
          }}
        >
          {userData && userDataAfterUpdate && (
            <>
              <Avatar>
                {userDataAfterUpdate?.fullName?.charAt(0)}
                {userDataAfterUpdate?.fullName?.split(" ")[1]?.charAt(0)}
              </Avatar>
              <Typography
                className={classes.nameAvatar}
                color="primary"
                variant="h5"
              >
                {userDataAfterUpdate.fullName}
              </Typography>
            </>
          )}
          <Button color="inherit" onClick={handleFirstClick}>
            {props.button1}
          </Button>
          <Button color="inherit" onClick={handleSecondClick}>
            {props.button2}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
