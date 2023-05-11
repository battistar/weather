import Head from 'next/head';
import { Box, Container, Stack } from '@mui/material';
import Footer from 'components/Footer';
import { useEffect } from 'react';
import { useAppDispatch } from 'app/hook';
import { fetchForecastByCoordinates } from 'features/forecast/forecastSlice';
import Forecast from 'features/forecast/Forecast';
import Search from 'features/search/Search';

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      dispatch(fetchForecastByCoordinates(coordinates));
    });
  });

  return (
    <>
      <Head>
        <title>Weather</title>
        <meta name="description" content="Simple weather forecast web app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="sm" component="main" sx={{ flex: 1, pb: 3 }}>
          <Stack spacing={3} sx={{ mt: 2, height: '100%' }}>
            <Search />
            <Forecast />
          </Stack>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
