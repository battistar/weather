import axios, { AxiosResponse } from 'axios';
import Forecast from 'models/Forecast';
import Location from 'models/Location';

const BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

const httpClient = axios.create({
  baseURL: BASE_URL,
});

export const search = async (query: string): Promise<AxiosResponse<Location[]>> => {
  const params = {
    key: API_KEY,
    q: query,
  };

  return await httpClient.get<Location[]>('search.json', { params: params });
};

export const forecastByCity = async (city: string): Promise<AxiosResponse<Forecast>> => {
  const params = {
    key: API_KEY,
    days: 3,
    q: city,
  };

  return await httpClient.get<Forecast>('forecast.json', { params: params });
};

export const forecastByCoordinates = async (latitude: number, longitude: number): Promise<AxiosResponse<Forecast>> => {
  const params = {
    key: API_KEY,
    days: 3,
    q: `${latitude},${longitude}`,
  };

  return await httpClient.get<Forecast>('forecast.json', { params: params });
};
