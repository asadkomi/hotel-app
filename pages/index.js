import Head from "next/head";
import Image from "next/image";
import Hero from "../components/sections/heroSection/Hero.jsx";
// import Home from "../components/sections/room/Home.jsx";

import Layout from "../components/layout/Layout";
import RoomHome from "../components/sections/room/RoomHome.jsx";
import Host from "../components/sections/Host.jsx";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <RoomHome />
      <Host />
    </Layout>
  );
}
