import axios, { AxiosResponse } from 'axios';
import Forecast from 'models/Forecast';
import Location from 'models/Location';

const BASE_URL = 'http://api.weatherapi.com/v1/';
const API_KEY = process.env.API_KEY;

export const search = async (query: string): Promise<AxiosResponse<Location[]>> => {
  const url = new URL('search.json', BASE_URL).toString();

  const params = {
    key: API_KEY,
    q: query,
  };

  return await axios.get<Location[]>(url, { params: params });
};

export const forecastByCity = async (city: string): Promise<AxiosResponse<Forecast>> => {
  const url = new URL('forecast.json', BASE_URL).toString();

  const params = {
    key: API_KEY,
    days: 3,
    q: city,
  };

  return await axios.get<Forecast>(url, { params: params });
};

export const forecastByCoordinates = async (latitude: number, longitude: number): Promise<AxiosResponse<Forecast>> => {
  const url = new URL('forecast.json', BASE_URL).toString();

  const params = {
    key: API_KEY,
    days: 3,
    q: `${latitude},${longitude}`,
  };

  return await axios.get<Forecast>(url, { params: params });
};
