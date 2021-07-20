import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark w-100 text-light  justify-content-center align-items-center  ">
      <div className="container ">
        <div className="row text-center">
          <div className="col-3">
            <h1>R.</h1>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul className="">
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul className="">
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
                <li>Link</li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div className="footer-links d-flex">
              <ul className="">
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
              Hotel Room &copy; 2021 All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
