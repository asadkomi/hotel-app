import React from "react";
import { getSession } from "next-auth/client";
import Dashboard from "../../../components/admin/Dashboard";
import MiniDrawer from "../../../components/layout/MiniDrawer";

export default function AllRoomsPage() {
  return (
    <MiniDrawer>
      <Dashboard />
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
