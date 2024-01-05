import axios from 'axios';
import {token} from './authenticate_api';
import { server_url } from '../constants';

export const instance = axios.create({
  baseURL: server_url, // Replace with your API base URL
});



// Request interceptor for API requests
instance.interceptors.request.use(
  (req) => {
    debugger;
    let tokenData=token;
    if (tokenData) {
        if (!req.url.includes('oauth/token')) {
        req.headers.Authorization = `Bearer ${token}`;
        }
      }
    return req;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor for API responses
instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here before passing it to the component
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default instance;