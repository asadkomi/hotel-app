import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";

const Search = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    if (location.trim()) {
      router.push(
        `/?location=${location}&guests=${guests}&category=${category}`
      );
    } else {
      router.push("/");
    }
  };
  return (
    <div className="container pt-5 ">
      <div className="row ">
        <div className="col-12">
          <form
            className="shadow-lg p-5 bg-light"
            style={{ borderRadius: "5px" }}
            onSubmit={submitHandler}
          >
            <h2 className="mb-3">Find Room</h2>
            <div className="form-group mb-2">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="Miami"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="guest_field">Guests</label>
              <select
                className="form-control"
                id="guest_field"
                placeholder="How many family members?"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="room_type_field">Room Type</label>
              <select
                className="form-control"
                id="room_type_field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["King", "Queen", "Full"].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className=" pt-4">
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
