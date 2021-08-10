/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import useStyle from "../../styles/style";
import { registerUser, clearErrors } from "../../redux/actions/userActions.jsx";

const Register = () => {
  const style = useStyle();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.register);
  useEffect(() => {
    closeSnackbar();
    if (success) {
      router.push("/login");
    }

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    const userInfo = {
      name,
      email,
      password,
    };
    dispatch(registerUser(userInfo));
  };

  return (
    <section
      className="d-flex flex-wrap align-items-center justify-content-center login"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/reg2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container ">
        <div className="row back-link ">
          <div className="col-md">
            <i className="fa fa-arrow-left " aria-hidden="true"></i>
            <Link className="mr-3" href="/">
              Back
            </Link>
          </div>
        </div>

        <Grid container spacing={1}>
          <Grid item md={8} xs={12}>
            <h1 className="pb-5">Join Us</h1>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, maiores?
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card raised className={style.card}>
              <form onSubmit={handleSubmit(submitHandler)}>
                <Typography className="p-3" variant="h4">
                  Register
                </Typography>
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
                          {...field}
                          error={Boolean(errors.name)}
                          helperText={
                            errors.name
                              ? errors.name.type === "minLength"
                                ? "Name should not be less than 2 characters"
                                : "Name is required"
                              : ""
                          }
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
                          {...field}
                          error={Boolean(errors.email)}
                          helperText={
                            errors.email
                              ? errors.email.type === "pattern"
                                ? "Email is not valid"
                                : "Email is required"
                              : ""
                          }
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
                        required: true,
                        minLength: 6,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="password"
                          label="Password"
                          inputProps={{ type: "password" }}
                          {...field}
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password
                              ? errors.password.type === "minLength"
                                ? "Password should not be less the 6 characters"
                                : "Password is required"
                              : ""
                          }
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
                        required: true,
                        minLength: 6,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="confirmPassword"
                          label="Confirm Password"
                          inputProps={{ type: "password" }}
                          {...field}
                          error={Boolean(errors.confirmPassword)}
                          helperText={
                            errors.confirmPassword
                              ? errors.confirmPassword.type === "minLength"
                                ? "Confirm Password should not be less than 6 characters"
                                : "Confirm Password is required"
                              : ""
                          }
                        ></TextField>
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
                      Register
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Typography className={style.typography}>
                      Aready have an account? &nbsp;
                    </Typography>
                    <NextLink
                      href={`/login?redirect=${redirect || "/"}`}
                      passHref
                    >
                      <Link>Login</Link>
                    </NextLink>
                  </ListItem>
                </List>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default Register;
