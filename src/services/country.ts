import axios from "axios";

export const fetchUserCountry = async () => {
  try {
    const country = (await axios.get(`https://api.ipbase.com/v1/json/`)).data
      .country_code;
    return country;
  } catch (error) {
    console.error('Error fetching country code:', error);
    return null;
  }
};
