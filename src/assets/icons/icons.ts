import {ImageSourcePropType} from 'react-native';

const icons: IImages = {
  logo: require('./logo.png'),
};

type ImageSrc = ImageSourcePropType;

export interface IImages {
  logo: ImageSrc;
}

export default icons as IImages;
