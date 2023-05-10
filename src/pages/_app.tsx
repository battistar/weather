import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import store from 'app/store';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <CssBaseline>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CssBaseline>
  );
};

export default App;
