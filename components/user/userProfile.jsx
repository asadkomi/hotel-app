/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { toast } from "react-toastify";
// import ButtonLoader from "../layout/ButtonLoader";
// import Loader from "../layout/Loader";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../redux/actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../redux/types/userTypes.jsx";
import { useSnackbar } from "notistack";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
} from "@material-ui/core";
import styles from "../../styles/style.jsx";

const Profile = () => {
  const style = styles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const { user: loadedUser, loading } = useSelector(
    (state) => state.loadedUser
  );
  //   console.log(loadedUser);
  const {
    error,
    isUpdated,
    loading: updateLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (loadedUser) {
      // setUser({
      //   name: loadedUser.name,
      //   email: loadedUser.email,
      // });
      setValue("name", loadedUser.name);
      setValue("email", loadedUser.email);

      //   setAvatarPreview(loadedUser.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, error, loadedUser]);

  const submitHandler = ({ name, email, password, confirmPassword }) => {
    // e.preventDefault();
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    const userData = {
      name,
      email,
      password,
    };

    dispatch(updateProfile(userData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className={style.section}>
      <Grid container spacing={1}>
        <Grid item md={2} xs={12}>
          <Card>
            <List>
              <NextLink href="/profile/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/bookings/user_bookings" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Bookings"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={10} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Profile
                </Typography>
              </ListItem>
              {/* <ListItem> */}
              <form
                onSubmit={handleSubmit(submitHandler)}
                // className={style.form}
              >
                <List>
                  <ListItem>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        minLength: 2,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="name"
                          label="Name"
                          inputProps={{ type: "name" }}
                          error={Boolean(errors.name)}
                          helperText={
                            errors.name
                              ? errors.name.type === "minLength"
                                ? "Name length is more than 1"
                                : "Name is required"
                              : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="email"
                          label="Email"
                          inputProps={{ type: "email" }}
                          error={Boolean(errors.email)}
                          helperText={
                            errors.email
                              ? errors.email.type === "pattern"
                                ? "Email is not valid"
                                : "Email is required"
                              : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) =>
                          value === "" ||
                          value.length > 5 ||
                          "Password length is more than 5",
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="password"
                          label="Password"
                          inputProps={{ type: "password" }}
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password
                              ? "Password length is more than 5"
                              : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        validate: (value) =>
                          value === "" ||
                          value.length > 5 ||
                          "Confirm Password length is more than 5",
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="confirmPassword"
                          label="Confirm Password"
                          inputProps={{ type: "password" }}
                          error={Boolean(errors.confirmPassword)}
                          helperText={
                            errors.password
                              ? "Confirm Password length is more than 5"
                              : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      color="primary"
                    >
                      Update
                    </Button>
                  </ListItem>
                </List>
              </form>
              {/* </ListItem> */}
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
