import React from "react";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout/Layout.jsx";
import BookingsDetails from "../../components/booking/BookingsDetails.jsx";
import MiniDrawer from "../../components/layout/MiniDrawer";
import { getBookingDetails } from "../../redux/actions/bookingActions.jsx";
import { wrapper } from "../../redux/store/store.jsx";

export default function MyBookingsPage() {
  return (
    <Layout>
      <BookingsDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
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
