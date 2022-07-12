import Head from "next/head";
import Header from "../src/components/Header";
import HomePage from "../views/HomePage";

export default function Home({ movies }) {
  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Tas using movie API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HomePage />
    </>
  );
}
