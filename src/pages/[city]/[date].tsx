import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { WarningAmber as WarningIcon } from '@mui/icons-material';
import Image from 'next/image';
import { ForecastDay } from 'models/Forecast';
import Footer from 'components/Footer';
import { useCallback, useMemo } from 'react';
import { fetchForecastByCity, selectForecast, selectStatus } from 'features/forecast/forecastSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import ForecastTable from 'components/ForecastTable';

const Details = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const forecast = useAppSelector(selectForecast);
  const status = useAppSelector(selectStatus);

  const city = router.query.city as string | undefined;
  const date = router.query.date as string | undefined;

  if (isEmpty(forecast) && city) {
    dispatch(fetchForecastByCity(city));
  }

  const forecastDay = useMemo<ForecastDay | undefined>(() => {
    if (!isEmpty(forecast)) {
      return forecast.forecast.forecastday.find((forecastDay) => {
        return forecastDay.date === date;
      });
    }
  }, [date, forecast]);

  const handleHomeClick = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <>
      {forecastDay && status === 'succeeded' && (
        <Stack sx={{ height: '100vh' }}>
          <Container maxWidth="md" component="main" sx={{ flex: 1, my: 3 }}>
            <Stack sx={{ gap: 3 }}>
              <Stack sx={{ alignItems: 'center', gap: 1, mb: 2 }}>
                <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'end' }}>
                  <Typography variant="h2" component="div">
                    {city}
                  </Typography>
                  <Image
                    src={`https:${forecastDay.day.condition.icon}`}
                    alt={forecastDay.day.condition.text}
                    width={64}
                    height={64}
                  />
                </Stack>
                <Typography variant="h4" component="div">{`${new Date(forecastDay.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                })}, ${new Date(forecastDay.date).getDate()}, ${new Date(forecastDay.date).toLocaleDateString('en-US', {
                  month: 'long',
                })}`}</Typography>
                <Stack direction="row" gap={1}>
                  <Typography variant="body1" component="div">
                    MAX: {forecastDay.day.maxtemp_c}°
                  </Typography>
                  <Typography variant="body1" component="div">
                    MIN: {forecastDay.day.mintemp_c}°
                  </Typography>
                </Stack>
              </Stack>

              <ForecastTable forecastDay={forecastDay} />
            </Stack>
          </Container>
          <Footer />
        </Stack>
      )}
      {status === 'failed' && (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          <WarningIcon sx={{ width: '100px', height: '100px' }} />
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            Forecast data not found
          </Typography>
          <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
            Forecast data not found. City or data could be wrong, or maybe server could be unreachable.
          </Typography>
          <Button variant="contained" onClick={handleHomeClick}>
            Home
          </Button>
        </Box>
      )}
    </>
  );
};

export default Details;
