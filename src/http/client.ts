import axios, { AxiosResponse } from 'axios';

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
