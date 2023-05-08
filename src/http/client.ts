import axios, { AxiosResponse } from 'axios';
import Forecast from 'models/Forecast';
import Location from 'models/Location';

export const search = async (
  query: string
): Promise<AxiosResponse<Omit<Location, 'tz_id' | 'localtime_epoch' | 'localtime'>[]>> => {
  const params = {
    query: query,
  };

  return await axios.get<Omit<Location, 'tz_id' | 'localtime_epoch' | 'localtime'>[]>('api/search', { params: params });
};

export const forecast = async (city: string): Promise<AxiosResponse<Forecast>> => {
  const params = {
    city: city,
  };

  return await axios.get<Forecast>('api/forecast', { params: params });
};
