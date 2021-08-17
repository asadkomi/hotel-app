/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { clearErrors } from "../../../redux/actions/roomActions.jsx";
import { useSelector, useDispatch } from "react-redux";
import RoomItem from "./RoomItem.jsx";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";

const RoomHome = () => {
  const { rooms, error, resPerPage, roomsCount, filteredRoomCount } =
    useSelector((state) => state.allRooms);

  const dispatch = useDispatch();
  const router = useRouter();

  let { location } = router.query;

  useEffect(() => {
    toast.error(error);
    dispatch(clearErrors());
  }, []);

  return (
    <section className="w-100">
      <div className="container">
        <div className="pt-4 stays-heading">
          <Typography variant="h2">
            {location ? `Rooms in ${location}` : "Explore"}
          </Typography>
        </div>
        <div className="row pt-2 pb-2">
          {rooms && rooms.length === 0 ? (
            <div className="alert aleart-danger">
              <Typography>No Room found</Typography>
            </div>
          ) : (
<<<<<<< HEAD
=======
            rooms &&
>>>>>>> stripe payment gateways fixed
            rooms.map((room) => <RoomItem key={room._id} room={room} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomHome;
