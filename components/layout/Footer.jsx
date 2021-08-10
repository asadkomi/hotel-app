import React from "react";
import { Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <footer className="pt-5 bg-dark w-100 text-light  justify-content-center align-items-center  ">
      <div className="container ">
        <div className="row text-center">
          <div className="col-3">
            <Typography variant="h1">Hotels Co.</Typography>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col">
            <p className="copy-right text-center mt-2">
              Hotels Co. &copy; 2021 All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
