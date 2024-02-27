import axios from 'axios';
import { toast } from 'react-toastify';
const env = import.meta.env;

export const authenticateUser = async (accountName: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.VITE_BACKEND_API_URL}/authenticate`,
      { accountName, password },
      { headers: { 'Content-Type': 'application/json' } },
    );

    if (response.status === 200) {
      return response.data.isAuthenticated;
    } else {
      toast.error('Error during authentication');
      console.error('Error during authentication:', response.statusText);
      return false;
    }
  } catch (error) {
    toast.error('Error during authentication');
    console.error('Error during authentication:', error);
    return false;
  }
};

export const submitLoginForm = async (formData: object) => {
    const response = await axios.post(`${process.env.VITE_BACKEND_API_URL}/submitLoginForm`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
};

export const checkAccountExists = async (email: string): Promise<boolean> => {
	try {
		const response = await fetch(`${env.VITE_BACKEND_API_URL}/checkAccountExists`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
	
		if (response.ok) {
			const result = await response.json();
			return result.exists;
		} else {
            toast.error('Error checking account existence');
			console.error('Error checking account existence:', response.statusText);
			return false;
		}
	} catch (error) {
        toast.error('Error checking account existence');
		console.error('Error checking account existence:', error);
		return false;
	}
};

export const initiatePasswordReset = async (email: string) => {
	try {
		const response = await fetch(`${env.VITE_BACKEND_API_URL}/initiate-password-reset`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		if (response.ok) {
			// Password reset initiation successful
      toast.success('Password reset initiated successfully');
			console.log('Password reset initiated successfully');
		} else {
			// Password reset initiation failed, handle the error
      toast.error('Error initiating password reset');
			console.error('Error initiating password reset:', response.statusText);
		}
	} catch (error) {
    toast.error('Error initiating password reset');
		console.error('Error initiating password reset:', error);
	}
};

export const checkExistingEmailUtil = async (email: string, token: string | null): Promise<boolean> => {
  try {
    const response = await axios.post(`${env.VITE_BACKEND_API_URL}/checkExistingEmail`, { email, recaptchaToken: token });
    const exists = response.data.exists;
    return exists;
  } catch (error) {
    toast.error('Error checking existing email');
    throw new Error('Error checking existing email');
  }
};

export const checkAccountAvailability = async (accountName: string) => {
  try {
    const response = await axios.post(`${env.VITE_BACKEND_API_URL}/checkAccountAvailability`, { accountName });
    return response.data.available;
  } catch (error) {
    throw new Error('Error checking account availability');
  }
};

export const createAccountStep2 = async (formData: {accountName: string; password: string;}) => {
  try {
    const response = await axios.post(`${env.VITE_BACKEND_API_URL}/createAccountStep2`, formData);
    return response.data;
  } catch (error) {
    toast.error('Error creating account');
    throw new Error('Error creating account');
  }
};

export const waitingTimeResponse = async () => {
  try {
    const response = await axios.get(`${env.VITE_BACKEND_API_URL}/waitingTimeResponse`);
    return response.data.time;
  } catch (error) {
    toast.error('Error waiting time response');
    throw new Error('Error waiting time response');
  }
}

export const checkEmailExistence = async (email: string) => {
  try {
    const response = await axios.post(
      `${env.VITE_BACKEND_API_URL}/checkEmailExistence`,
      { email },
    );
    return response.data.exists;
  } catch (error) {
    toast.error('Error checking existing email');
    throw new Error('Error checking existing email');
  }
};