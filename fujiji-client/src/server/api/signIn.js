import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function signIn({ email, password }) {
  const queryString = getQueryString({ email, password });

  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/auth/signin`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return result;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      return {
        error: data.error,
        status,
      };
    }
    return {
      error: 'Something went wrong... Check if Fujiji API is running',
      status: 500,
    };
  }
}
