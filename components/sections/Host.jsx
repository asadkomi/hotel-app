/* eslint-disable @next/next/no-img-element */
import React from "react";

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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              dolor inventore! Deleniti recusandae deserunt, iste magnam commodi
              hic eligendi pariatur! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Est, dolor inventore! Deleniti recusandae
              deserunt, iste magnam commodi hic eligendi pariatur!
            </p>
            <a
              href="#"
              className="btn btn-dark btn-raised shadow my-button w-xs mt-3"
            >
              Hosting
            </a>
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
