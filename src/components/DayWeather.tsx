import { Grid, Stack, Typography } from '@mui/material';
import Forecast from 'models/Forecast';
import Image from 'next/image';

const DayWeather = ({ forecast }: { forecast: Forecast }): JSX.Element => {
  return (
    <Stack sx={{ px: 2, border: (theme) => `1px solid ${theme.palette.grey[400]}`, borderRadius: 1 }}>
      {forecast.forecast.forecastday.map((forecastDay, index) => {
        return (
          <Grid container key={forecastDay.date_epoch} gap={1} sx={{ alignItems: 'center' }}>
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
              <Typography variant="body1" component="div">
                MAX: {forecastDay.day.maxtemp_c}°
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="div">
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
