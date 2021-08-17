import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#972479",
    color: "#fff",

    "& a": {
      color: "#fff",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#fff",
  },
  gap: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  section: {
    width: "100%",
    height: "100vh",
    padding: 30,
  },

  dashboardSection: {
    width: "100%",
    padding: 15,
    marginTop: 50,
  },
  dashboardButton: {
    backgroundColor: "#972479",
    color: "#fff",
    textTransform: "none",
  },

  typography: {
    fontSize: "16px",
  },
  typographyMain: {
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
  },

  homeCard: {
    maxHeight: "400",
  },
  form: {
    width: "60%",
    margin: "0 auto",
  },

  card: {
    width: "100%",
    maxWidth: 500,
  },

  transparentBg: {
    backgroundColor: "transparent",
    marginTop: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    width: 350,
    textAlign: "center",
    borderRadius: 10,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  image: {
    height: 500,
  },
}));

export default useStyle;
