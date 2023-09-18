import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { ForecastDay } from 'models/Forecast';
import { getHoursFromISO, isCurrentDay, isCurrentHour } from 'utils/time';

const DesktopTable = ({ forecastDay }: { forecastDay: ForecastDay }): JSX.Element => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hour</TableCell>
            <TableCell align="right">Condition</TableCell>
            <TableCell align="right">Degrees (C°)</TableCell>
            <TableCell align="right">Wind (km/h)</TableCell>
            <TableCell align="right">Precipitation (mm)</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">UV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecastDay.hour.map((hour) => {
            return (
              <TableRow
                key={hour.time_epoch}
                hover={true}
                selected={isCurrentDay(hour.time) && isCurrentHour(hour.time)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{getHoursFromISO(hour.time)}</TableCell>
                <TableCell align="right">
                  <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={64} height={64} />
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
  );
};

export default DesktopTable;
