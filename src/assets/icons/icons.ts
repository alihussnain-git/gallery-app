import {ImageSourcePropType} from 'react-native';

const icons: IImages = {
  logo: require('./soniq_logo.png'),
};

type ImageSrc = ImageSourcePropType;

export interface IImages {
  logo: ImageSrc;
}

export default icons as IImages;
