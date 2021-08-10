import React from "react";
import { getSession } from "next-auth/client";
import Profile from "../../components/user/userProfile.jsx";
import Layout from "../../components/layout/Layout.jsx";

export default function profile() {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
