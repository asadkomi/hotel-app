import React from "react";
import Login from "../components/authentication/Login.jsx";
import { getSession } from "next-auth/client";

const login = () => {
  return (
    <>
      <Login />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default login;
