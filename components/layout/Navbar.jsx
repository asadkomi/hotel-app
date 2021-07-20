/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg  navbar-light  py-3 fixed-top w-100">
      <div className="container ">
        <Link href="/">
          <a className="navbar-brand brand">
            <span>R.</span>
          </a>
        </Link>

        <div>
          {/* <a href="#" className="btn btn-dark btn-raised shadow my-button w-xs">
            Login
          </a> */}
          <div className="col-3 mt-md-0 text-center">
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure
                  className="avatar avatar-nav"
                  style={{ width: "20px", height: "20px" }}
                >
                  <img
                    src="/images/hookah-bar.svg"
                    alt="asad"
                    className="rounded-circle"
                  />
                </figure>
                <span>Asad Abdalla</span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/admin/rooms">
                  <a className="dropdown-item">Rooms</a>
                </Link>

                <Link href="/admin/bookings">
                  <a className="dropdown-item">Bookings</a>
                </Link>

                <Link href="/admin/users">
                  <a className="dropdown-item">Users</a>
                </Link>

                <Link href="/admin/reviews">
                  <a className="dropdown-item">Reviews</a>
                </Link>

                <hr />

                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>

                <Link href="/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    // onClick={logoutHandler}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
            {/* ) : (
            !loading && ( */}
            {/* <Link href="/login">
              <a className="btn btn-danger px-4 text-white login-header-btn float-right">
                Login
              </a>
            </Link> */}
            {/* )
          )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
