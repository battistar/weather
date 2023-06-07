import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { selectForecast } from 'features/forecast/forecastSlice';
import { ForecastDay } from 'models/Forecast';
import { useSearchParams, notFound } from 'next/navigation';
import { useMemo } from 'react';
import { useAppSelector } from 'store/hook';
import { getHoursFromISO } from 'utils/time';
import Footer from 'components/Footer';
import { isBrowser } from 'react-device-detect';

const Details = (): JSX.Element => {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const forecast = useAppSelector(selectForecast);

  const forecastDay = useMemo<ForecastDay | undefined>((): ForecastDay | undefined => {
    return forecast.forecast.forecastday.find((forecastDay) => {
      return forecastDay.date === date;
    });
  }, [forecast, date]);

  if (!forecastDay) {
    notFound();
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" component="main" sx={{ flex: 1, my: 3 }}>
        <Stack gap={1} sx={{ alignItems: 'center', mb: 2 }}>
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

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Hour</TableCell>
                <TableCell align="center">Condition</TableCell>
                <TableCell align="center">Degrees (C°)</TableCell>
                <TableCell align="center">Wind direction</TableCell>
                <TableCell align="center">Wind speed (km/h)</TableCell>
                <TableCell align="center">Precipitation (mm)</TableCell>
                <TableCell align="center">Humidity</TableCell>
                <TableCell align="center">UV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forecastDay.hour.map((hour) => {
                return (
                  <TableRow
                    key={hour.time_epoch}
                    hover={isBrowser}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{getHoursFromISO(hour.time)}</TableCell>
                    <TableCell align="center">
                      <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={64} height={64} />
                    </TableCell>
                    <TableCell align="center">{hour.temp_c}</TableCell>
                    <TableCell align="center">{hour.wind_dir}</TableCell>
                    <TableCell align="center">{hour.wind_kph}</TableCell>
                    <TableCell align="center">{hour.precip_mm}</TableCell>
                    <TableCell align="center">{hour.humidity}</TableCell>
                    <TableCell align="center">{hour.uv}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </Box>
  );
};

export default Details;
