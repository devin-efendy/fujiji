import axios from 'axios';
import config from '../../../config';
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
    const result = await axios.put(
      `${config.FUJIJI_API_URL}/user/${userID}`,
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
