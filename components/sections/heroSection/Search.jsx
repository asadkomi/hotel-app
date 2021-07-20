import React from "react";

const Search = () => {
  return (
    <div className="container pt-5 ">
      <div className="row ">
        <div className="col-12">
          <form
            className="shadow-lg p-5 bg-light"
            style={{ borderRadius: "5px" }}
          >
            <h2 className="mb-3">Find Room</h2>
            <div className="form-group mb-2">
              <label htmlFor="location_field">Location</label>
              <input
                type="text"
                className="form-control"
                id="location_field"
                placeholder="Miami"
                // value={location}
                // onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="guest_field">Guests</label>
              <select
                className="form-control"
                id="guest_field"
                placeholder="How many family members?"
                // value={guests}
                // onChange={(e) => setGuests(e.target.value)}
              >
                {/* {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))} */}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="room_type_field">Room Type</label>
              <select
                className="form-control"
                id="room_type_field"
                // value={category}
                // onChange={(e) => setCategory(e.target.value)}
              >
                {/* {["King", "Single", "Twins"].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))} */}
              </select>
            </div>

            <a
              href="#"
              className="btn btn-dark btn-raised shadow my-button w-xs mt-3 "
            >
              Search
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Search;
