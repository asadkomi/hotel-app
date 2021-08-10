import React from "react";
import { getSession } from "next-auth/client";

import Layout from "../../../components/layout/Layout.jsx";
import AllRooms from "../../../components/admin/AllRooms";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import MiniDrawer from "../../../components/layout/MiniDrawer";

export default function AllRoomsPage() {
  return (
    <MiniDrawer>
      <AllRooms />
    </MiniDrawer>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
