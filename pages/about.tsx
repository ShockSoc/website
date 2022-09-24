import { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components";
import { AboutUs } from "../components/AboutUs";

const About: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>ShockSoc York - About</title>
        <meta name="description" content="ShockSoc website - About page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <AboutUs />
      </main>
    </div>
  );
};

export default About;