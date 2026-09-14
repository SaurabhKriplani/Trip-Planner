// globalApi.jsx
import axios from 'axios';

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchImages = async (query) => {
  if (!apiKey) {
    console.error('Pexels API key is not configured. Please add VITE_PEXELS_API_KEY to your .env file.');
    return [];
  }

  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=5`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data.photos; // Returns an array of photo objects
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
