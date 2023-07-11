import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import CustomImage from '../../../components/CustomImage';
import appTheme from '../../../theme/appTheme';
import TestId from '../../../utils/testId';

interface Props {
  url: string;
  onPress: () => void;
  imageHeight: number;
}

const GalleryImageItem: React.FC<Props> = ({url, onPress, imageHeight}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity testID={TestId.galleryImage} onPress={onPress}>
        <CustomImage
          style={[styles.thumbnailImage, {height: imageHeight}]}
          source={{uri: url}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default GalleryImageItem;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    marginBottom: appTheme.spacing.xSmall,
  },
  thumbnailImage: {
    width: '95%',
  },
});
