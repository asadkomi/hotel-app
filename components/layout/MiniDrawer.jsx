import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NextLink from "next/link";
import GroupIcon from "@material-ui/icons/Group";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Dashboard from "../admin/Dashboard";
import NavMenu from "./NavMenu.jsx";
import useStyle from "../../styles/style.jsx";

import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import DashboardFooter from "./dashboardFooter.jsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#972479",
    color: "#fff",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  paper: {
    background: "#972479",
    color: "#fff",
  },

  divider: {
    // Theme Color, or use css color in quote
    background: "#fff",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer({ children }) {
  const style = useStyle();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerLinkHandler = (e, redirect) => {
    if (redirect) {
      router.push(redirect);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
            <NavMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(
            classes.drawer,
            {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            },
            classes.paper
          )}
          classes={{
            paper: clsx(
              {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              },
              classes.paper
            ),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "#fff" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "#fff" }} />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <NextLink href="/admin/dashboard" passHref>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <List>
            <NextLink href="/admin/rooms" passHref>
              <ListItem button>
                <ListItemIcon>
                  <HomeWorkIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Rooms"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <List>
            <NextLink href="/admin/bookings" passHref>
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Bookings"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <List>
            <NextLink href="/admin/users" passHref>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Users"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider classes={{ root: classes.divider }} />

          <List>
            <NextLink href="/" passHref>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Home"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <List>
            <NextLink href="/profile/profile" passHref>
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Profile"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
          <List>
            <NextLink href="/bookings/user_bookings" passHref>
              <ListItem button>
                <ListItemIcon>
                  <ViewAgendaIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="My Bookings"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
          <Divider />
        </Drawer>

        {children}
      </div>
      <DashboardFooter />
    </>
  );
}
