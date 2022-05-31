import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Main from '../components/Main';
import tw from "tailwind-styled-components";
const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Create Rainbowkit App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Header />


      <Main />


    </Container >
  );
};

const Container = tw.div`
h-screen

justify-center
items-center
bg-slate-50
text-black
 `;

export default Home;
