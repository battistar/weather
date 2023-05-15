import { Link, Stack, Typography } from '@mui/material';

const BUILD_YEAR = 2023;
const CURRENT_YEAR = new Date().getFullYear();

const Footer = (): JSX.Element => {
  let date;
  if (BUILD_YEAR !== CURRENT_YEAR) {
    date = `${BUILD_YEAR} - ${CURRENT_YEAR}`;
  } else {
    date = `${CURRENT_YEAR}`;
  }

  return (
    <Stack
      direction="row"
      component="footer"
      sx={{ justifyContent: 'space-between', p: 1, backgroundColor: (theme) => theme.palette.grey[200] }}
    >
      <Typography variant="body2" component="div">
        © {date} Samuele Battistella
      </Typography>
      <Typography variant="body2" component="div">
        Powered by{' '}
        <Link href="https://www.weatherapi.com/" title="Free Weather API">
          WeatherAPI.com
        </Link>
      </Typography>
    </Stack>
  );
};

export default Footer;
