import {
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
} from '@mui/material';
import Image from 'next/image';
import { getHoursFromISO } from 'utils/time';
import { useCallback, useState } from 'react';
import { ForecastDay } from 'models/Forecast';

type SelectData = 'Temperature' | 'Wind' | 'Precipitation' | 'Humidity' | 'UV';

const MobileTable = ({ forecastDay }: { forecastDay: ForecastDay }): JSX.Element => {
  const [visualizedData, setVisualizedData] = useState<SelectData>('Temperature');

  const handleChangeSelect = useCallback((event: SelectChangeEvent): void => {
    setVisualizedData(event.target.value as SelectData);
  }, []);

  return (
    <Stack gap={3}>
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

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hour</TableCell>
              <TableCell>Condition</TableCell>
              {visualizedData === 'Temperature' && <TableCell align="right">Degrees (C°)</TableCell>}
              {visualizedData === 'Wind' && <TableCell align="right">Wind (km/h)</TableCell>}
              {visualizedData === 'Precipitation' && <TableCell align="right">Precipitation (mm)</TableCell>}
              {visualizedData === 'Humidity' && <TableCell align="right">Humidity</TableCell>}
              {visualizedData === 'UV' && <TableCell align="right">UV</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {forecastDay.hour.map((hour) => {
              return (
                <TableRow
                  key={hour.time_epoch}
                  selected={new Date().getHours() === new Date(hour.time).getHours()}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontSize: '1.2rem' }}>{getHoursFromISO(hour.time)}</TableCell>
                  <TableCell>
                    <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={64} height={64} />
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
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default MobileTable;
