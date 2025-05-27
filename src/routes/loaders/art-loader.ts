import { getArtDetail } from '@/apis/gallery/art';
import { LoaderFunctionArgs } from 'react-router-dom';

export const artLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await getArtDetail(Number(params.artsNo));

  return response;
};
