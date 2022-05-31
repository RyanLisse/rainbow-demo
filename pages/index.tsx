import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Main from '../components/Main';
const Home: NextPage = () => {
  return (
    <div className="flex ">
      <Head>
        <title>Create Rainbowkit App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-end p-4">
        <Header />

      </div>
      <Main />
    </div>
  );
};

export default Home;
