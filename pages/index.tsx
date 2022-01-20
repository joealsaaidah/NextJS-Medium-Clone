import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className='mx-auto max-w-7xl'>
      <Head>
        <title>Medium-Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <Hero />
    </div>
  );
}
