/**
 * This module sets up and exports Axios instances for making HTTP requests.
 * The base URL for the Axios instances is determined based on the hostname:
 * - If the hostname is 'localhost', the base URL is set to the local development server.
 * - Otherwise, the base URL is set to the production server.
 *
 * Two Axios instances are created:
 * - `axiosInstance`: A general-purpose instance for making HTTP requests.
 * - `axiosPrivate`: An instance with additional headers and credentials for secure or authenticated requests.
 */

import axios from 'axios';

// BASE_URL have to be const, for the production build
const BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8000/local_server_url'
    : 'https://production_server_location_url';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default axiosInstance;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
