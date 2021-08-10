import React from "react";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout/Layout.jsx";
import MyBookings from "../../components/booking/MyBookings.jsx";
import { myBookings } from "../../redux/actions/bookingActions.jsx";
import { wrapper } from "../../redux/store/store.jsx";
export default function UserBookings() {
  return (
    <Layout title="My Bookings">
      <MyBookings />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      await store.dispatch(myBookings(req.headers.cookie, req));
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) =>
//       async ({ req, query }) => {
//         await store.dispatch(
//           getAllRooms(
//             req,
//             query.page,
//             query.location,
//             query.guests,
//             query.category
//           )
//         );
//       }
//   );
