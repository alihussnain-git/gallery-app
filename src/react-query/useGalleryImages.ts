import {useQuery} from 'react-query';
import {GalleryImagesAPI} from '../api/API';

const IMAGE_REQUEST = 'image_request';
const useGalleryImages = () =>
  useQuery(IMAGE_REQUEST, GalleryImagesAPI.fetchGalleryImages);
export default useGalleryImages;
