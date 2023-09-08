import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ForecastDay } from 'models/Forecast';
import { getHoursFromISO } from 'utils/time';
import Footer from 'components/Footer';
import * as weatherAPI from 'http/weatherAPI';
import { useState } from 'react';

type SelectData = 'Temperature' | 'Wind' | 'Precipitation' | 'Humidity' | 'UV';

const Details = ({ forecastDay }: { forecastDay: ForecastDay }): JSX.Element => {
  const [visualizedData, setVisualizedData] = useState<SelectData>('Temperature');
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));
  const searchParams = useSearchParams();
  const city = searchParams.get('city');

  const handleChangeSelect = (event: SelectChangeEvent): void => {
    setVisualizedData(event.target.value as SelectData);
  };

  return (
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

          {xs && (
            <FormControl fullWidth sx={{ display: { xs: 'block', sm: 'none' } }}>
              <InputLabel id="select-label">Visualized data</InputLabel>
              <Select
                fullWidth
                labelId="select-label"
                value={visualizedData}
                label="Visualized data"
                onChange={handleChangeSelect}
              >
                <MenuItem value={'Temperature'}>Temperature</MenuItem>
                <MenuItem value={'Wind'}>Wind</MenuItem>
                <MenuItem value={'Precipitation'}>Precipitation</MenuItem>
                <MenuItem value={'Humidity'}>Humidity</MenuItem>
                <MenuItem value={'UV'}>UV</MenuItem>
              </Select>
            </FormControl>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                {xs && (
                  <TableRow>
                    <TableCell>Hour</TableCell>
                    <TableCell align="right">Condition</TableCell>
                    {visualizedData === 'Temperature' && <TableCell align="right">Degrees (C°)</TableCell>}
                    {visualizedData === 'Wind' && <TableCell align="right">Wind (km/h)</TableCell>}
                    {visualizedData === 'Precipitation' && <TableCell align="right">Precipitation (mm)</TableCell>}
                    {visualizedData === 'Humidity' && <TableCell align="right">Humidity</TableCell>}
                    {visualizedData === 'UV' && <TableCell align="right">UV</TableCell>}
                  </TableRow>
                )}
                {!xs && (
                  <TableRow>
                    <TableCell>Hour</TableCell>
                    <TableCell align="right">Condition</TableCell>
                    <TableCell align="right">Degrees (C°)</TableCell>
                    <TableCell align="right">Wind (km/h)</TableCell>
                    <TableCell align="right">Precipitation (mm)</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">UV</TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {xs &&
                  forecastDay.hour.map((hour) => {
                    return (
                      <TableRow
                        key={hour.time_epoch}
                        selected={new Date().getHours() === new Date(hour.time).getHours()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell sx={{ fontSize: '1.2rem' }}>{getHoursFromISO(hour.time)}</TableCell>
                        <TableCell align="right">
                          <Image
                            src={`https:${hour.condition.icon}`}
                            alt={hour.condition.text}
                            width={64}
                            height={64}
                          />
                        </TableCell>
                        {visualizedData === 'Temperature' && (
                          <TableCell align="right" sx={{ fontSize: '1.2rem' }}>
                            {hour.temp_c}
                          </TableCell>
                        )}
                        {visualizedData === 'Wind' && (
                          <TableCell
                            align="right"
                            sx={{ fontSize: '1.2rem' }}
                          >{`${hour.wind_kph} ${hour.wind_dir}`}</TableCell>
                        )}
                        {visualizedData === 'Precipitation' && (
                          <TableCell align="right" sx={{ fontSize: '1.2rem' }}>
                            {hour.precip_mm}
                          </TableCell>
                        )}
                        {visualizedData === 'Humidity' && (
                          <TableCell align="right" sx={{ fontSize: '1.2rem' }}>
                            {hour.humidity}
                          </TableCell>
                        )}
                        {visualizedData === 'UV' && (
                          <TableCell align="right" sx={{ fontSize: '1.2rem' }}>
                            {hour.uv}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                {!xs &&
                  forecastDay.hour.map((hour) => {
                    return (
                      <TableRow
                        key={hour.time_epoch}
                        hover={true}
                        selected={new Date().getHours() === new Date(hour.time).getHours()}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{getHoursFromISO(hour.time)}</TableCell>
                        <TableCell align="right">
                          <Image
                            src={`https:${hour.condition.icon}`}
                            alt={hour.condition.text}
                            width={64}
                            height={64}
                          />
                        </TableCell>
                        <TableCell align="right">{hour.temp_c}</TableCell>
                        <TableCell align="right">{`${hour.wind_kph} ${hour.wind_dir}`}</TableCell>
                        <TableCell align="right">{hour.precip_mm}</TableCell>
                        <TableCell align="right">{hour.humidity}</TableCell>
                        <TableCell align="right">{hour.uv}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
};

export const getServerSideProps = async ({
  query,
}: {
  query: {
    date: string | undefined;
    city: string | undefined;
  };
}): Promise<{ notFound: boolean } | { props: { forecastDay: ForecastDay } }> => {
  let forecastDay: ForecastDay | undefined;

  if (query.date && query.city) {
    const response = await weatherAPI.forecastByCity(query.city);

    if (response.status === 200) {
      forecastDay = response.data.forecast.forecastday.find((forecastDay) => {
        return forecastDay.date === query.date;
      });

      if (forecastDay) {
        return {
          props: {
            forecastDay: forecastDay,
          },
        };
      }
    }
  }

  return {
    notFound: true,
  };
};

export default Details;
