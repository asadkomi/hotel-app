import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/client";
import Backdrop from "@material-ui/core/Backdrop";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Button, Menu, MenuItem } from "@material-ui/core";
import useStyle from "../../styles/style.jsx";
import { loadUser } from "../../redux/actions/userActions.jsx";

export default function NavMenu() {
  const style = useStyle();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.loadedUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const logoutClickHandler = () => {
    signOut();
  };

  const menuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  return (
    <>
      <div className={style.gap}></div>
      <div>
        {user ? (
          <>
            <Button
              className={style.navbarButton}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={loginClickHandler}
            >
              <AccountCircleIcon />
              <span style={{ paddingLeft: "10px" }}> {user.name}</span>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              BackdropComponent={Backdrop}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={(e) => menuCloseHandler(e, "#")}
            >
              {user.role === "admin" && (
                <MenuItem
                  onClick={(e) => menuCloseHandler(e, "/admin/dashboard")}
                >
                  Dashboard
                </MenuItem>
              )}
              <MenuItem
                onClick={(e) => menuCloseHandler(e, "/profile/profile")}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={(e) => menuCloseHandler(e, "/bookings/user_bookings")}
              >
                Bookings
              </MenuItem>
              <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          !loading && (
            <NextLink href="/login" passHref>
              <Button className={style.navbarButton}>Login</Button>
            </NextLink>
          )
        )}
      </div>
    </>
  );
}
