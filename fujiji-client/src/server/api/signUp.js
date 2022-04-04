import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function signUp({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}) {
  const formatLastName = lastName ? ` ${lastName}` : '';
  const queryString = getQueryString({
    name: `${firstName}${formatLastName}`,
    email,
    password,
    phoneNumber,
  });

  try {
    const { publicRuntimeConfig } = getConfig();
    const result = await axios.post(
      `${publicRuntimeConfig.FUJIJI_API_URL}/auth/signup`,
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
