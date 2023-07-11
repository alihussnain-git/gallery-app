import Axios, {AxiosResponse} from 'axios';
import {baseURL} from './environment';
import * as GalleryImagesAPI from './galleryImages';

const axiosClient = Axios.create({
  baseURL: baseURL,
});

export namespace API {
  export async function get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosClient.get<T>(url);
      if (isResponseSuccessful(response)) {
        return response.data;
      } else {
        throw new Error('Request failed');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  function isResponseSuccessful(response: AxiosResponse): boolean {
    return response.status >= 200 && response.status < 300;
  }
}

export {GalleryImagesAPI};
