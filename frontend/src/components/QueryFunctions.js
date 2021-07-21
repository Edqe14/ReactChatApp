import Axios from 'axios';
import Endpoints from '../config/endpoints';

export const axios = Axios.create({
  baseURL: Endpoints.API,
});

export const fetchUser = (id) =>
  axios.get(`/user/${id}`).then((res) => res.data);
