import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://overfast-api.tekrop.fr',
});