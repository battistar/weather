import { Stack, Typography } from '@mui/material';
import Forecast from 'models/Forecast';
import Image from 'next/image';

const CurrentWather = ({ forecast }: { forecast: Forecast }): JSX.Element => {
  return (
    <Stack gap={1} sx={{ alignItems: 'center' }}>
      <Typography variant="h4" component="div">
        {forecast.location.name}
      </Typography>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Typography variant="h1" component="div">
          {forecast.current.temp_c}°
        </Typography>
        <Image
          src={`https:${forecast.current.condition.icon}`}
          alt={forecast.current.condition.text}
          width={64}
          height={64}
        />
      </Stack>
      <Typography variant="body1" component="div">
        {forecast.current.condition.text}
      </Typography>
      <Stack direction="row" gap={1}>
        <Typography variant="body1" component="div">
          MAX: {forecast.forecast.forecastday[0].day.maxtemp_c}°
        </Typography>
        <Typography variant="body1" component="div">
          MIN: {forecast.forecast.forecastday[0].day.mintemp_c}°
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CurrentWather;
