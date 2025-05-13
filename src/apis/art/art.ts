import apiInstance from '@/lib/axios';
import axios from 'axios';

// GET /gallery/arts
export const getArts = async () => {
  const response = await apiInstance.get('/gallery/arts');
  return response.data;
};

export const getArtsMocking = async () => {
  const response = await axios.get('/gallery/arts');
  return response.data;
};

// GET /gallery/arts/:id
export const getArt = async (artNo: number) => {
  const response = await apiInstance.get(`/gallery/arts/${artNo}`);
  return response.data;
};

export const getArtMocking = async (artNo: number) => {
  const response = await axios.get(`/galleries/arts/${artNo}`);
  return response.data;
};
