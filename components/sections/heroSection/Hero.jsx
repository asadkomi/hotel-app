/* eslint-disable @next/next/no-img-element */
import { Typography } from "@material-ui/core";
import React from "react";
import Search from "./Search.jsx";
import { Button } from "@material-ui/core";

const Hero = () => {
  return (
    <section
      className="pb-5 w-100 about"
      id="about"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className=" text-center">
          <ul className="secondary-nav">
            <li className="secondary-item">
              <a href="#home" className="secondary-link">
                <Typography>Home </Typography>
              </a>
            </li>
            <li className="secondary-item">
              <a href="#about" className="secondary-link">
                <Typography>About</Typography>
              </a>
            </li>

            <li className="secondary-item">
              <a href="#event" className="secondary-link">
                <Typography>Events</Typography>
              </a>
            </li>
          </ul>
        </div>
        <div className="row align-items-center justify-content-between pt-2">
          <div className="col-md">
            {/* <img src="/images/hookah-bar.svg" className="img-fluid" alt="" /> */}
            <Search />
          </div>
          <div className="col-md p-5 text-dark">
            <Typography variant="h1">Are you looking for a room ?</Typography>

            <Button color="primary" variant="contained">
              Explore
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
