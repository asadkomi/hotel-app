/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import DatePicker from "react-datepicker";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from "mdb-react-ui-kit";
import RoomAmenities from "./RoomAmenities.jsx";

const RoomDetails = () => {
  return (
    <section className="p-sm-5 pt-5 pb-5 w-100 " id="about">
      <div className="container pt-5">
        <div className="row">
          <div className="col-md">
            <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
            <div className="row">
              <div className="col-md">
                <p>200 Olympic Dr, Stafford, VS, 22554</p>
              </div>
              <div className="col-md text-sm-end">
                <div className="ratings mt-auto mb-3">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">3 Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2 Row */}
        <div className="row">
          <div className="col-md">
            <MDBCarousel showIndicators showControls fade>
              <MDBCarouselInner>
                <MDBCarouselItem itemId={0}>
                  <MDBCarouselElement
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                    alt="..."
                  />
                </MDBCarouselItem>

                <MDBCarouselItem itemId={1}>
                  <MDBCarouselElement
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                    alt="..."
                  />
                </MDBCarouselItem>

                <MDBCarouselItem itemId={2}>
                  <MDBCarouselElement
                    src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                    alt="..."
                  />
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
          </div>
        </div>
        {/* 2 Row */}
        <div className="row pt-5 pb-5">
          <div className="col-md">
            <div className="top">
              <div className="host d-flex ">
                <figure
                  className="avatar avatar-nav"
                  style={{
                    width: "50px",
                    height: "50px",
                    // border: "1px solid black",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src="/images/hookah-bar.svg"
                    alt="asad"
                    className="rounded-circle"
                  />
                </figure>
                <h5 className="mt-3 ml-5">Host Name</h5>
              </div>
              <div className="bottom mt-4">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                  temporibus!
                </p>
              </div>
            </div>

            <hr />
            <h3>Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              natus vero ratione tempore nam praesentium dolor quae fuga
              suscipit mollitia!
            </p>
            <hr />
            <RoomAmenities />
            <hr />
          </div>
          <div className="col-md pb-5">
            <div className="booking-card shadow p-4">
              <p className="price-per-night">
                <b>$120</b> / night
              </p>
              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
              <DatePicker className="w-100" selectsRange />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
