import React from "react";
import Link from "next/link";

const Login = () => {
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
      <div className="container ">
        <div className="row back-link ">
          <div className="col-md">
            <i className="fa fa-arrow-left " aria-hidden="true"></i>
            <Link className="mr-3" href="/">
              Back
            </Link>
          </div>
        </div>
        <div className="row p ">
          <div className="col-md left p-5  flex-wrap align-items-center justify-content-center">
            <h1 className="pb-5">
              Welcom Back To <span style={{ color: "red" }}>R.</span>
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, maiores?
            </p>
          </div>
          <div className="col-md right p-5">
            <form
              className="shadow-lg p-4"
              style={{
                backgroundColor: "#fff",
                borderRadius: "5px",
                height: "400px",
                width: "350px",
              }}
            >
              <h1 className="mb-3 text-center">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input type="email" id="email_field" className="form-control" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                />
              </div>

              <Link href="/password/forgot" className="float-right mb-4">
                Forgot Password?
              </Link>

              <a
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                // disabled={loading ? true : false}
              >
                {/* {loading ? <ButtonLoader /> : "LOGIN"} */}
                Login
              </a>

              <Link href="/register" className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
