/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

const Host = () => {
  return (
    <section className="p-sm-5 pt-5 pb-5 w-100 about" id="about">
      <div
        className="container host-container "
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="row align-items-center justify-content-between">
          <div className="col-md p-5 text-dark">
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              dolor inventore! Deleniti recusandae deserunt, iste magnam commodi
              hic eligendi pariatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Est, dolor inventore! Deleniti recusandae
              deserunt, iste magnam commodi hic eligendi pariatur!
            </Typography>
            <div className="pt-4">
              <Button color="primary" variant="contained">
                Hosting
              </Button>
            </div>
          </div>
          <div className="col-md">
            {/* <img src="/images/hookah-bar.svg" className="img-fluid" alt="" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Host;
