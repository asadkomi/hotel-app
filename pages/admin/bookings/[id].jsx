import React from "react";
import { getSession } from "next-auth/client";
import MiniDrawer from "../../../components/layout/MiniDrawer";
import BookingsDetails from "../../../components/booking/BookingsDetails.jsx";
import { getBookingDetails } from "../../../redux/actions/bookingActions.jsx";
import { wrapper } from "../../../redux/store/store.jsx";

export default function AllRoomsPage() {
  return (
    <MiniDrawer>
      <BookingsDetails />
    </MiniDrawer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session || session.user.role !== "admin") {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getBookingDetails(req.headers.cookie, req, params.id)
      );
    }
);
