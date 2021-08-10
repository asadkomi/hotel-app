/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import NextLink from "next/link";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
export default function RoomItem({ room }) {
  return (
    <div className="col-md-4 pb-2">
      <Card>
        <NextLink href={`/room/${room._id}`} passHref>
          <CardActionArea>
            <CardMedia
              height="200"
              component="img"
              image={room.images[0].url}
              title={room.name}
            ></CardMedia>
            <CardContent>
              <Typography>{room.name}</Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
        <CardActions>
          <Typography>${room.price} / night</Typography> <br />
        </CardActions>
        <CardActions>
          <div className="main-outer">
            <div
              className="main-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </CardActions>
        <CardActions>
          <NextLink href={`/room/${room._id}`} passHref>
            <Button variant="contained" type="submit" fullWidth color="primary">
              View Details
            </Button>
          </NextLink>
        </CardActions>
      </Card>
    </div>
  );
}
