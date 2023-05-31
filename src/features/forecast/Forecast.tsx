import { Box, CircularProgress, Stack } from '@mui/material';
import CurrentWather from 'components/CurrentWeather';
import DayWeather from 'components/DayWeather';
import HourWeather from 'components/HourWeather';
import { useAppSelector } from 'store/hook';
import { selectForecast, selectStatus } from './forecastSlice';

const Forecast = (): JSX.Element => {
  const forecast = useAppSelector(selectForecast);
  const status = useAppSelector(selectStatus);

  return (
    <>
      {status === 'loading' ? (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        status === 'succeeded' && (
          <Stack gap={3}>
            <CurrentWather forecast={forecast} />
            <HourWeather forecast={forecast} />
            <DayWeather forecast={forecast} />
          </Stack>
        )
      )}
    </>
  );
};

export default Forecast;
