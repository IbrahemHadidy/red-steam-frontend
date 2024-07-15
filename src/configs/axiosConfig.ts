import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.message !== 'jwt expired') {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || 'Internal Server Error';
        toast.error(errorMessage);
      } else {
        toast.error('Network Error');
        console.error('Network error:', error.message);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;