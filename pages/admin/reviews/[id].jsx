import React from "react";
import { getSession } from "next-auth/client";
import RoomReviews from "../../../components/admin/RoomReviews";
import MiniDrawer from "../../../components/layout/MiniDrawer";

export default function RoomReviewPage() {
  return (
    <MiniDrawer>
      <RoomReviews />
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
