import React from "react";
import WifiIcon from "@material-ui/icons/Wifi";
import TvIcon from "@material-ui/icons/Tv";
import PetsIcon from "@material-ui/icons/Pets";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { Typography, Grid } from "@material-ui/core";

const RoomAmenities = ({ room }) => {
  return (
    <div className="features mt-5">
      <Typography variant="h4" className="mb-4">
        Amenities
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={6} xs={6}>
          <div className="room-feature pb-2">
            <Typography>
              <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
            </Typography>
            <Typography>{room.guests}</Typography>
          </div>

          <div className="room-feature pb-2">
            <Typography>
              <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
            </Typography>
            <Typography>{room.beds}</Typography>
          </div>

          <div className="room-feature pb-2">
            <Typography>
              <WifiIcon />
            </Typography>
            <Typography>
              <i
                className={
                  room.wifi
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
            </Typography>
          </div>

          <div className="room-feature pb-2">
            <Typography>
              <TvIcon />
            </Typography>
            <Typography>
              <i
                className={
                  room.tv
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
            </Typography>
          </div>
        </Grid>
        <Grid item md={6} xs={6}>
          <div className="room-feature pb-2">
            <Typography>
              <AcUnitIcon />
            </Typography>
            <Typography>
              <i
                className={
                  room.conditioning
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
            </Typography>
          </div>

          <div className="room-feature pb-2">
            <Typography>
              <PetsIcon />
            </Typography>
            <Typography>
              <i
                className={
                  room.pets
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
            </Typography>
          </div>

          <div className="room-feature pb-2">
            <Typography>
              <WbSunnyIcon />
            </Typography>
            <Typography>
              <i
                className={
                  room.heating
                    ? "fa fa-check text-success"
                    : "fa fa-times text-danger"
                }
                aria-hidden="true"
              ></i>
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default RoomAmenities;
