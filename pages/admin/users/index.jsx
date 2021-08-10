import React from "react";
import { getSession } from "next-auth/client";

import Layout from "../../../components/layout/Layout.jsx";
import MiniDrawer from "../../../components/layout/MiniDrawer";
import AllUsers from "../../../components/admin/AllUsers.jsx";

export default function AllUsersPage() {
  return (
    <MiniDrawer>
      <AllUsers />
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
