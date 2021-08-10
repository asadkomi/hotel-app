import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { signIn } from "next-auth/client";

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

const Login = () => {
  const style = useStyle();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      enqueueSnackbar(result.error, { variant: "error" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <section
      className="d-flex flex-wrap align-items-center justify-content-center login"
      style={{
        height: "100vh",
        backgroundImage: "url('/images/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container pb-5">
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
            <h1 className="pb-5">
              Welcom Back To <span style={{ color: "red" }}>R.</span>
            </h1>
            <Typography>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, maiores?
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card raised>
              <form
                onSubmit={handleSubmit(submitHandler)}
              >
                <Typography className="p-3" component="h1" variant="h4">
                  Login
                </Typography>
                <List>
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
                  <ListItem className="pt-3">
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
                      Login
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Typography className={style.typography}>
                      Don&apos;t have an account? &nbsp;
                    </Typography>
                    <NextLink
                      href={`/register?redirect=${redirect || "/"}`}
                      passHref
                    >
                      <Link>Register</Link>
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

export default Login;
