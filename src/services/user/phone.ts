import axios from 'axios';
import { toast } from 'react-toastify';

const env = import.meta.env;

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

export async function sendOTP(phoneNumber: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/send-otp`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error sending OTP:', error);
  }
}

export async function resendOTP(phoneNumber: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/resend-otp`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error resending OTP:', error);
  }
}

export async function verifyOTP(phoneNumber: string, otp: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/verify-otp`;
  const data = { phoneNumber, otp };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error verifying OTP:', error);
  }
}

export async function verifyVerificationCode(
  phoneNumber: string,
  verificationCode: string,
) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/verify-verification-code`;
  const data = { phoneNumber, verificationCode };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error verifying verification code:', error);
  }
}

export async function changePhoneNumber(userId: string, phoneNumber: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/change-phone-number`;
  const data = { userId, phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error changing phone number:', error);
  }
}

export async function removePhoneNumber(userId: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/remove-phone-number`;
  const data = { userId };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error removing phone number:', error);
  }
}

export async function verifyPhoneNumber(phoneNumber: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/verify-phone-number`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error verifying phone number:', error);
  }
}

export async function sendVerificationCode(phoneNumber: string) {
  const url = `${env.VITE_BACKEND_API_URL}/api/user/phone/send-verification-code`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // @ts-expect-error eslint-disable-next-line
    toast.error(error.data.message || 'Internal Server Error');;
    console.error('Error sending verification code:', error);
  }
}
