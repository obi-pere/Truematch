import axios, { AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export const api = axios.create({
  baseURL,
  withCredentials: true
});

let isRefreshing = false;
let refreshQueue: Array<() => void> = [];
let hasRefreshFailed = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !(originalRequest as { _retry?: boolean })._retry &&
      !hasRefreshFailed
    ) {
      (originalRequest as { _retry?: boolean })._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await api.post('/auth/refresh');
          hasRefreshFailed = false;
          refreshQueue.forEach((cb) => cb());
          refreshQueue = [];
        } catch (_refreshError) {
          hasRefreshFailed = true;
          refreshQueue = [];
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        refreshQueue.push(() => resolve(api(originalRequest)));
      });
    }

    return Promise.reject(error);
  }
);
