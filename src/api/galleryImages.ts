import {API} from './API';

export interface GalleryImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const IMAGE_LIST_URL = '/list?limit=100';

export const fetchGalleryImages = async () => {
  return API.get<GalleryImage[]>(IMAGE_LIST_URL);
};
