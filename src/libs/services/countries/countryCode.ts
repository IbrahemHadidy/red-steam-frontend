import axios from 'axios';

export const fetchUserCountry = async (): Promise<string | null> => {
  try {
    const country: string = (await axios.get(`https://api.ipbase.com/v1/json/`)).data.country_code;
    return country;
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
};
