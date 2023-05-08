import Head from 'next/head';
import Search from './features/search/search';

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Search />
      </main>
    </>
  );
};

export default Home;
