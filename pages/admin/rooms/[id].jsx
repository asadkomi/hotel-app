import React from "react";
import { getSession } from "next-auth/client";
import MiniDrawer from "../../../components/layout/MiniDrawer";
import UpdateRoom from "../../../components/admin/UpdateRoom";

export default function AllRoomsPage() {
  return (
    <MiniDrawer>
      <UpdateRoom />
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
