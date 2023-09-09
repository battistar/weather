import axios, { AxiosResponse } from 'axios';
import Forecast from 'models/Forecast';
import Location from 'models/Location';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const search = async (
  query: string
): Promise<AxiosResponse<Omit<Location, 'tz_id' | 'localtime_epoch' | 'localtime'>[]>> => {
  const params = {
    query: query,
  };

  return await httpClient.get<Omit<Location, 'tz_id' | 'localtime_epoch' | 'localtime'>[]>('api/search', {
    params: params,
  });
};

export const forecastByCity = async (city: string): Promise<AxiosResponse<Forecast>> => {
  const params = {
    city: city,
  };

  return await httpClient.get<Forecast>('api/forecast', { params: params });
};

export const forecastByCoordinates = async (latitude: number, longitude: number): Promise<AxiosResponse<Forecast>> => {
  const params = {
    lat: latitude,
    lon: longitude,
  };

  return await httpClient.get<Forecast>('api/forecast', { params: params });
};
