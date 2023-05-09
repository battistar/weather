import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'pages/app/store';
import * as client from 'http/client';
import Forecast from 'models/Forecast';

interface ForecastState {
  forecast: Forecast;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ForecastState = {
  forecast: {} as Forecast,
  status: 'idle',
  error: null,
};

export const fetchForecast = createAsyncThunk('search/fetchForecast', async (city: string): Promise<Forecast> => {
  const response = await client.forecast(city);

  return response.data;
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const selectForecast = (state: RootState): typeof state.forecast.forecast => state.forecast.forecast;

export const selectStatus = (state: RootState): typeof state.forecast.status => state.forecast.status;

export const selectError = (state: RootState): typeof state.forecast.error => state.forecast.error;

export default forecastSlice.reducer;
