import { Box, Stack, Typography } from '@mui/material';
import Forecast from 'models/Forecast';
import Image from 'next/image';
import { getHoursFromISO } from 'utils/time';

const HourWeather = ({ forecast }: { forecast: Forecast }): JSX.Element => {
  return (
    <Box sx={{ p: 1, border: (theme) => `1px solid ${theme.palette.grey[400]}`, borderRadius: 4 }}>
      <Stack direction="row" gap={1} sx={{ overflow: 'auto', pb: 1 }}>
        {forecast.forecast.forecastday[0].hour.map((hour) => {
          return (
            <Stack
              key={hour.time_epoch}
              sx={{
                alignItems: 'center',
                backgroundColor: (theme) =>
                  new Date().getHours() === new Date(hour.time).getHours()
                    ? theme.palette.action.selected
                    : 'transparent',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" component="div">
                {getHoursFromISO(hour.time)}
              </Typography>
              <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={64} height={64} />
              <Typography variant="body1" component="div">
                {hour.temp_c}°
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default HourWeather;
