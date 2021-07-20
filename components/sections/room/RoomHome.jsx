/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import Link from "next/link";

const RoomHome = () => {
  return (
    <section className="w-100">
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="col-md-3 pb-3">
            <div className="card  shadow-lg ">
              <img className="card-img-top" src="/images/hero.jpg" alt="ro" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link href="#">
                    <a>Room name</a>
                  </Link>
                </h5>

                <div className="ratings mt-auto mb-3">
                  <p className="card-text">
                    <b>$130</b> / night
                  </p>

                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      // style={{ width: `${(room.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">5 Reviews</span>
                </div>

                <button className="btn btn-dark btn-raised shadow my-button w-xs mt-3">
                  <Link href="/roomDetails">View Details</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3 pb-3">
            <div className="card  shadow-lg ">
              <img
                className="card-img-top mx-auto"
                src="/images/hero.jpg"
                alt="ro"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link href="#">
                    <a>Room name</a>
                  </Link>
                </h5>

                <div className="ratings mt-auto mb-3">
                  <p className="card-text">
                    <b>$130</b> / night
                  </p>

                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      // style={{ width: `${(room.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">5 Reviews</span>
                </div>

                <button className="btn btn-dark btn-raised shadow my-button w-xs mt-3">
                  <Link href="#">View Details</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3 pb-3">
            <div className="card  shadow-lg">
              <img
                className="card-img-top mx-auto"
                src="/images/hero.jpg"
                alt="ro"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link href="#">
                    <a>Room name</a>
                  </Link>
                </h5>

                <div className="ratings mt-auto mb-3">
                  <p className="card-text">
                    <b>$130</b> / night
                  </p>

                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      // style={{ width: `${(room.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">5 Reviews</span>
                </div>

                <button className="btn btn-dark btn-raised shadow my-button w-xs mt-3">
                  <Link href="#">View Details</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3 pb-3">
            <div className="card  shadow-lg">
              <img
                className="card-img-top mx-auto"
                src="/images/hero.jpg"
                alt="ro"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link href="#">
                    <a>Room name</a>
                  </Link>
                </h5>

                <div className="ratings mt-auto mb-3">
                  <p className="card-text">
                    <b>$130</b> / night
                  </p>

                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      // style={{ width: `${(room.ratings / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span id="no_of_reviews">5 Reviews</span>
                </div>

                <a className="btn btn-dark btn-raised shadow my-button w-xs mt-3">
                  <Link href="#">View Details</Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomHome;
