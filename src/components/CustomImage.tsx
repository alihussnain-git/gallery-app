import React, {useState} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  testID?: string;
}

const CustomImage: React.FC<Props> = ({source, style, testID}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {isImageLoading && (
        <ActivityIndicator
          testID="image-loading-indicator"
          style={styles.imageLoader}
        />
      )}
      <Image
        testID={testID}
        source={source}
        style={style}
        onLoad={handleImageLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLoader: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

export default CustomImage;
