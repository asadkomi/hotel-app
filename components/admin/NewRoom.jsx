/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { newRoom, clearErrors } from "../../redux/actions/roomActions";
import { NEW_ROOM_RESET } from "../../redux/types/roomTypes.jsx";
import { useSnackbar } from "notistack";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import styles from "../../styles/style.jsx";

const NewRoom = () => {
  const style = styles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const { loading, error, success } = useSelector((state) => state.newRoom);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push("/admin/rooms");
      dispatch({ type: NEW_ROOM_RESET });
    }
  }, [dispatch, error, success]);

  const submitHandler = ({
    name,
    price,
    description,
    address,
    category,
    guests,
    beds,
    wifi,
    tv,
    conditioning,
    pets,
    heating,
  }) => {
    closeSnackbar();

    const roomData = {
      name,
      price,
      description,
      address,
      category,
      guests,
      beds,
      wifi: Boolean(wifi),
      tv: Boolean(tv),
      conditioning: Boolean(conditioning),
      pets: Boolean(pets),
      heating: Boolean(heating),
      images,
    };

    if (images.length === 0)
      return enqueueSnackbar("Please upload images", { variant: "error" });

    dispatch(newRoom(roomData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>
                Rooms / New Room
              </Typography>
              <div className={style.gap}></div>
            </ListItem>
            
          </List>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <List>
          <ListItem>
              {loading && <CircularProgress></CircularProgress>}
              {error && (
                <Typography className={style.error}>{error}</Typography>
              )}
            </ListItem>
            <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
              <List>
                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: "name" }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "Name length is more than 1"
                              : "Name is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="price"
                        label="Price"
                        error={Boolean(errors.price)}
                        helperText={errors.price ? "Price is required" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        multiline
                        maxRows={6}
                        id="description"
                        label="Description"
                        error={Boolean(errors.description)}
                        helperText={
                          errors.description ? "Description is required" : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="address"
                        label="Address"
                        {...field}
                        error={Boolean(errors.address)}
                        helperText={
                          errors.address
                            ? errors.address.type === "minLength"
                              ? "Address should not be less than 2 characters"
                              : "Address is required"
                            : ""
                        }
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        defaultValue="King"
                        id="category"
                        label="Category"
                        {...field}
                        error={Boolean(errors.category)}
                        helperText={
                          errors.category ? "Category is required" : ""
                        }
                      >
                        {["King", "Queen", "Full"].map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="guests"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        defaultValue="1"
                        id="guests"
                        label="Guests"
                        {...field}
                        error={Boolean(errors.guests)}
                        helperText={errors.guests ? "Guests is required" : ""}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <MenuItem key={num} value={num}>
                            {num}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="beds"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        id="beds"
                        label="Beds"
                        {...field}
                        error={Boolean(errors.beds)}
                        helperText={errors.beds ? "Beds is required" : ""}
                      >
                        {[1, 2, 3].map((num) => (
                          <MenuItem key={num} value={num}>
                            {num}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Grid container spacing={1}>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="wifi"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormControlLabel
                            id="wfi"
                            label="Wifi"
                            {...field}
                            control={<Checkbox name="wifi" />}
                          ></FormControlLabel>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="tv"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormControlLabel
                            id="tv"
                            label="TV"
                            {...field}
                            control={<Checkbox name="tv" />}
                          ></FormControlLabel>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="conditioning"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormControlLabel
                            id="conditioning"
                            label="Conditioning"
                            {...field}
                            control={<Checkbox name="conditioning" />}
                          ></FormControlLabel>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="heating"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormControlLabel
                            id="heating"
                            label="Heating"
                            {...field}
                            control={<Checkbox name="heating" />}
                          ></FormControlLabel>
                        )}
                      ></Controller>
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <Controller
                        name="pets"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <FormControlLabel
                            id="pets"
                            label="Pets"
                            {...field}
                            control={<Checkbox name="pets" />}
                          ></FormControlLabel>
                        )}
                      ></Controller>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <div className="form-group mt-4 mb-5">
                    <Typography className="mb-3">Images</Typography>

                    <div className="custom-file mb-3">
                      <Button variant="contained" component="label">
                        Choose Images
                        <input
                          id="images"
                          type="file"
                          name="room_images"
                          hidden
                          className="custom-file-input"
                          onChange={onChange}
                          multiple
                        />
                      </Button>
                    </div>
                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    style={{
                      backgroundColor: "#972479",
                      color: "#fff",
                      textTransform: "none",
                      margin: "0",
                    }}
                  >
                    Create
                  </Button>
                </ListItem>
              </List>
            </form>
            {/* </ListItem> */}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewRoom;
