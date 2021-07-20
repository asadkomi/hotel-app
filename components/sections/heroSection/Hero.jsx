/* eslint-disable @next/next/no-img-element */
import React from "react";
import Search from "./Search.jsx";

const Hero = () => {
  return (
    <section
      className="pt-5 pb-5 w-100 about"
      id="about"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="pt-5 text-center">
          <ul className="secondary-nav">
            <li className="secondary-item">
              <a href="#home" className="secondary-link">
                Home
              </a>
            </li>
            <li className="secondary-item">
              <a href="#about" className="secondary-link">
                About
              </a>
            </li>
            <li className="secondary-item">
              <a href="#menu" className="secondary-link">
                Menu
              </a>
            </li>
            <li className="secondary-item">
              <a href="#event" className="secondary-link">
                Events
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
            <h1>Are you looking for a room ?</h1>

            <a
              href="#"
              className="btn btn-dark btn-raised shadow my-button w-xs mt-3"
            >
              Explore
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
