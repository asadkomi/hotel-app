/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/client";
import Backdrop from "@material-ui/core/Backdrop";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import useStyle from "../../styles/style.jsx";
import { loadUser } from "../../redux/actions/userActions.jsx";
import NavMenu from "./NavMenu.jsx";

const Navbar = () => {
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
    <AppBar position="sticky" className={style.navbar}>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link>
            <Typography>
              <img
                className={style.logo}
                style={{ cursor: "pointer" }}
                src="/images/logo1.png"
                alt="Hotels Co."
              />
            </Typography>
          </Link>
        </NextLink>
        <NavMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
