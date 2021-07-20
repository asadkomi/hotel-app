/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Register = () => {
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
        <div className="row ">
          <div className="col-md left p-5  flex-wrap align-items-center justify-content-center">
            <h1 className="pb-5">Join Us</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Quibusdam, maiores?
            </p>
          </div>
          <div className="col-md reg-right p-5">
            <form
              className="shadow-lg p-4"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                height: "500px",

                width: "350px",
              }}
            >
              <h1 className="mb-3 text-center">Register</h1>
              <div className="form-group">
                <label htmlFor="name_field">Full Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  //   value={name}
                  //   onChange={onChange}
                />
              </div>
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
              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src="/images/hero.jpg"
                        className="rounded-circle"
                        alt="image"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      // onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                //   disabled={loading ? true : false}
              >
                {/* {loading ? <ButtonLoader /> : "REGISTER"} */}
                Rgister
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
