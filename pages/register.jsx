import React from "react";
import Register from "../components/authentication/Register.jsx";
import { getSession } from "next-auth/client";
const register = () => {
  return (
    <>
      <Register />
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

export default register;
