import { useTheme, useMediaQuery } from '@mui/material';
import MobileTable from './Mobile';
import DesktopTable from './Desktop';
import { ForecastDay } from 'models/Forecast';
import { useMemo } from 'react';

const ForecastTable = ({ forecastDay }: { forecastDay: ForecastDay }): JSX.Element => {
  const theme = useTheme();
  const xsBreakpoint = useMediaQuery(theme.breakpoints.only('xs'));

  const table = useMemo(() => {
    if (xsBreakpoint) {
      return <MobileTable forecastDay={forecastDay} />;
    } else {
      return <DesktopTable forecastDay={forecastDay} />;
    }
  }, [forecastDay, xsBreakpoint]);

  return table;
};

export default ForecastTable;
