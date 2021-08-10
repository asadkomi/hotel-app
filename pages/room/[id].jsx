import React from "react";
import Layout from "../../components/layout/Layout";

import RoomDetails from "../../components/sections/room/RoomDetails";
import { getRoomDetails } from "../../redux/actions/roomActions.jsx";
import { wrapper } from "../../redux/store/store.jsx";

export default function RoomDetailsPage() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
