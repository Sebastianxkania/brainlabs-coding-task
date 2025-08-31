import axios from 'axios';

import Cookies from "js-cookie";
const csrftoken = Cookies.get("csrftoken");
console.log('CSRF Token from Cookies:', csrftoken);

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'X-CSRFToken': csrftoken || '', // Include CSRF token in headers


  },
});


// Interceptor to add fresh CSRF token from cookie
apiClient.interceptors.request.use(config => {
  const csrftoken = Cookies.get("csrftoken");
  if (csrftoken) {
    config.headers["X-CSRFToken"] = csrftoken;
  }
  return config;
});


export default apiClient;
