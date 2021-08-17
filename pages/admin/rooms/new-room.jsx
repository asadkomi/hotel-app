import React from "react";
import { getSession } from "next-auth/client";
import Layout from "../../../components/layout/Layout.jsx";
import NewRoom from "../../../components/admin/NewRoom";
import MiniDrawer from "../../../components/layout/MiniDrawer";

export default function NewRoomPage() {
  return (
    <MiniDrawer title="Create room">
      <NewRoom />
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
