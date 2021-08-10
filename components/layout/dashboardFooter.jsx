import React from "react";
import { Typography } from "@material-ui/core";

const DashboardFooter = () => {
  return (
    <footer className="pt-5 bg-light w-100 text-dark  justify-content-center align-items-center  ">
      <div className="container ">
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

export default DashboardFooter;
