import React from 'react';
import {StyleSheet, Modal, TouchableOpacity, View, Text} from 'react-native';
import {GalleryImage} from '../api/galleryImages';
import {strings} from '../locale/strings';
import appTheme from '../theme/appTheme';
import TestId from '../utils/testId';
import CustomImage from './CustomImage';

interface Props {
  visible: boolean;
  image: GalleryImage | undefined;
  close: () => void;
  openComments: (image?: GalleryImage) => void;
}

const FullImageModel: React.FC<Props> = ({
  image,
  close,
  visible,
  openComments,
}) => {
  return (
    <Modal testID={TestId.imageModal} visible={visible} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.closeButton}
            onPress={close}>
            <Text
              style={{
                color: appTheme.colors.black,
              }}>
              {strings.imageModal.close}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID={TestId.openCommentsButton}
            onPress={() => openComments(image)}
            activeOpacity={0.7}
            style={styles.commentsButton}>
            <Text
              style={{
                color: appTheme.colors.black,
              }}>
              {strings.imageModal.comments}
            </Text>
          </TouchableOpacity>
          {image && (
            <CustomImage
              testID="modal-image"
              style={styles.modalImage}
              source={{uri: image.download_url}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};
export default FullImageModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: appTheme.colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: '90%',
    width: '90%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeIcon: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
  },
  closeButton: {
    position: 'absolute',
    bottom: appTheme.spacing.xxSmall,
    right: appTheme.spacing.xxxSmall,
    backgroundColor: appTheme.colors.white,
    zIndex: 9,
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTheme.spacing.small,
  },
  commentsButton: {
    position: 'absolute',
    bottom: appTheme.spacing.xxSmall,
    right: 66,
    backgroundColor: appTheme.colors.white,
    zIndex: 9,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: appTheme.spacing.small,
  },
});
