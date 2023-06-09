import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import * as client from 'http/client';
import Forecast from 'models/Forecast';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

type Error = string | null;

interface ForecastState {
  forecast: Forecast;
  status: Status;
  error: Error;
}

const initialState: ForecastState = {
  forecast: {} as Forecast,
  status: 'idle',
  error: null,
};

export const fetchForecastByCity = createAsyncThunk(
  'forecast/fetchForecastByCity',
  async (city: string): Promise<Forecast> => {
    const response = await client.forecastByCity(city);

    return response.data;
  }
);

export const fetchForecastByCoordinates = createAsyncThunk(
  'forecast/fetchForecastByCoordinates',
  async (coordinates: { latitude: number; longitude: number }): Promise<Forecast> => {
    const { latitude, longitude } = coordinates;
    const response = await client.forecastByCoordinates(latitude, longitude);

    return response.data;
  }
);

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForecastByCity.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchForecastByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecastByCity.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(fetchForecastByCoordinates.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchForecastByCoordinates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecastByCoordinates.rejected, (state, action) => {
        state.status = 'failed';
        if (action.error.message) {
          state.error = action.error.message;
        }
      });
  },
});

export const selectForecast = (state: RootState): Forecast => state.forecast.forecast;

export const selectStatus = (state: RootState): Status => state.forecast.status;

export const selectError = (state: RootState): Error => state.forecast.error;

export default forecastSlice.reducer;
