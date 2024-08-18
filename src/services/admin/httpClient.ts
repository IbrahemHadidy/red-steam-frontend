import { fetchUtils } from 'react-admin';
interface CustomResponse {
  status: number;
  headers: Headers;
  body: string;
  json: unknown;
}

const httpClient = (url: string, options: RequestInit = {}): Promise<CustomResponse> => {
  const AUTH_TOKEN: string | null = sessionStorage.getItem('authorization');
  // Add additional headers if needed
  const headers: Headers = new Headers(options.headers || {});
  headers.set('authorization', `Bearer ${AUTH_TOKEN}`);

  return fetchUtils.fetchJson(url, { ...options, headers });
};

export default httpClient;
