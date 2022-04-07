import axios from 'axios';
import FormData from 'form-data';

export default async function uploadImage(image) {
  try {
    const data = new FormData();
    data.append('image', image, image.name);
    const result = await axios.post(
      'https://fujijifunctions.azurewebsites.net/api/uploadImage?code=EzRnmAilmvcIaVoglBsGqoXiW14jyhoaqCGoZNdbypwpCmEr4QShGw==',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
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
