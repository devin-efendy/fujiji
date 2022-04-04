import axios from 'axios';
import getConfig from 'next/config';
import getQueryString from '../../utils/getQueryString';

export default async function editProfile({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  userID,
  auth,

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
    const result = await axios.put(
      `${publicRuntimeConfig.FUJIJI_API_URL}/user/${userID}`,
      queryString,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${auth}`,
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
