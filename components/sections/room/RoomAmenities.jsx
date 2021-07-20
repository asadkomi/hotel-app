import React from "react";

const RoomAmenities = () => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features</h3>
      <div className="row">
        <div className="col-md">
          <div className="room-feature">
            <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
            <p>6 Guests</p>
          </div>

          <div className="room-feature">
            <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
            <p>3 Beds</p>
          </div>

          <div className="room-feature">
            <i className="fa fa-check text-success" aria-hidden="true"></i>
            <p>Breakfast</p>
          </div>

          <div className="room-feature">
            <i className="fa fa-check text-success" aria-hidden="true"></i>
            <p>Internet</p>
          </div>
        </div>
        <div className="col-md">
          <div className="room-feature">
            <i className="fa fa-check text-success" aria-hidden="true"></i>
            <p>Air Condition</p>
          </div>

          <div className="room-feature">
            <i className="fa fa-check text-danger" aria-hidden="true"></i>
            <p>Pet Allowed</p>
          </div>

          <div className="room-feature">
            <i className="fa fa-check text-success" aria-hidden="true"></i>
            <p>Room Cleaning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomAmenities;
