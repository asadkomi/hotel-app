import Hero from "../components/sections/heroSection/Hero.jsx";

import Layout from "../components/layout/Layout";
import RoomHome from "../components/sections/room/RoomHome.jsx";
import Host from "../components/sections/Host.jsx";
import { getRooms } from "../redux/actions/roomActions";
import { wrapper } from "../redux/store/store";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <RoomHome />
      <Host />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(
        getRooms(req, query.page, query.location, query.guests, query.category)
      );
    }
);


