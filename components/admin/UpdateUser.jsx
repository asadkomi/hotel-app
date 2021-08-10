/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { toast } from "react-toastify";
// import ButtonLoader from "../layout/ButtonLoader";
// import Loader from "../layout/Loader";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../redux/actions/userActions";
import { UPDATE_USER_RESET } from "../../redux/types/userTypes.jsx";
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
  MenuItem,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import styles from "../../styles/style.jsx";

const UpdateUser = () => {
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

  const { user, loading } = useSelector((state) => state.userDetails);

  const { error, isUpdated } = useSelector((state) => state.user);

  const userId = router.query.id;
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      router.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, error, userId, user]);

  const submitHandler = ({ name, email, role }) => {
    closeSnackbar();

    const userData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(user._id, userData));
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
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>
                Users / Edit User
              </Typography>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              {loading && <CircularProgress></CircularProgress>}
              {error && (
                <Typography className={style.error}>{error}</Typography>
              )}
            </ListItem>

            <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
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
                    name="role"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        id="role"
                        label="Role"
                        {...field}
                        error={Boolean(errors.role)}
                        helperText={errors.role ? "Role is required" : ""}
                      >
                        {["admin", "user"].map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: "#972479",
                      color: "#fff",
                      textTransform: "none",
                      margin: "0",
                    }}
                  >
                    Update
                  </Button>
                </ListItem>
              </List>
            </form>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateUser;
