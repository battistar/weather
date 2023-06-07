import { Grid, Stack, Typography } from '@mui/material';
import Forecast from 'models/Forecast';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { isBrowser } from 'react-device-detect';

const DayWeather = ({ forecast }: { forecast: Forecast }): JSX.Element => {
  const router = useRouter();

  const handleClick = useCallback(
    (date: string) => () => {
      router.push(`details?date=${date}`);
    },
    [router]
  );

  return (
    <Stack sx={{ border: (theme) => `1px solid ${theme.palette.grey[400]}`, borderRadius: 4, overflow: 'hidden' }}>
      {forecast.forecast.forecastday.map((forecastDay, index) => {
        return (
          <Grid
            container
            key={forecastDay.date_epoch}
            gap={1}
            onClick={handleClick(forecastDay.date)}
            sx={{
              px: 2,
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                background: isBrowser
                  ? (theme): string =>
                      theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]
                  : 'none',
              },
              '&:active': {
                background: (theme) =>
                  theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
              },
            }}
          >
            <Grid item xs>
              <Typography variant="body1" component="div">
                {index === 0 ? 'Today' : new Date(forecastDay.date).toLocaleDateString('en-US', { weekday: 'long' })}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Image
                src={`https:${forecastDay.day.condition.icon}`}
                alt={forecastDay.day.condition.text}
                width={64}
                height={64}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="div" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                MAX: {forecastDay.day.maxtemp_c}°
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="div" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                MIN: {forecastDay.day.mintemp_c}°
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Stack>
  );
};

export default DayWeather;
