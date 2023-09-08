import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { TipsAndUpdates as TipsIcon } from '@mui/icons-material';
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
      {status === 'idle' && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          <TipsIcon sx={{ width: '100px', height: '100px' }} />
          <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
            Enable location or search a city to visualize forecast
          </Typography>
        </Box>
      )}
      {status === 'loading' && (
        <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'succeeded' && (
        <Stack gap={3}>
          <CurrentWather forecast={forecast} />
          <HourWeather forecast={forecast} />
          <DayWeather forecast={forecast} />
        </Stack>
      )}
    </>
  );
};

export default Forecast;
