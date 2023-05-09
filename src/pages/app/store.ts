import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import forecastSlice from 'pages/features/forecast/forecastSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    forecast: forecastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
