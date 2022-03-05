import axios from 'axios';
import config from '../../../config';
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
    const result = await axios.post(
      `${config.FUJIJI_API_URL}/auth/signup`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return result;
  } catch (error) {
    const { data, status } = error.response;
    return {
      error: data.error,
      status,
    };
  }
}
