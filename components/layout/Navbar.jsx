/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import useStyle from "../../styles/style.jsx";
import { loadUser } from "../../redux/actions/userActions.jsx";
import NavMenu from "./NavMenu.jsx";

const Navbar = () => {
  const style = useStyle();
  const dispatch = useDispatch();
  const { user} = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  
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
