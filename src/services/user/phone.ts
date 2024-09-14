import axios from '@configs/axiosConfig';
import { toast } from 'react-toastify';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function sendOTP(phoneNumber: string) {
  const url = `${backendUrl}/api/user/phone/send-otp`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}

export async function resendOTP(phoneNumber: string) {
  const url = `${backendUrl}/api/user/phone/resend-otp`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error resending OTP:', error);
  }
}

export async function verifyOTP(phoneNumber: string, otp: string) {
  const url = `${backendUrl}/api/user/phone/verify-otp`;
  const data = { phoneNumber, otp };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
  }
}

export async function verifyVerificationCode(phoneNumber: string, verificationCode: string) {
  const url = `${backendUrl}/api/user/phone/verify-verification-code`;
  const data = { phoneNumber, verificationCode };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error verifying verification code:', error);
  }
}

export async function changePhoneNumber(userId: string, phoneNumber: string) {
  const url = `${backendUrl}/api/user/phone/change-phone-number`;
  const data = { userId, phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error changing phone number:', error);
  }
}

export async function removePhoneNumber(userId: string) {
  const url = `${backendUrl}/api/user/phone/remove-phone-number`;
  const data = { userId };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error('Error removing phone number:', error);
  }
}

export async function verifyPhoneNumber(phoneNumber: string) {
  const url = `${backendUrl}/api/user/phone/verify-phone-number`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error verifying phone number:', error);
  }
}

export async function sendVerificationCode(phoneNumber: string) {
  const url = `${backendUrl}/api/user/phone/send-verification-code`;
  const data = { phoneNumber };

  try {
    const response = await axios.post(url, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error('Error sending verification code:', error);
  }
}
