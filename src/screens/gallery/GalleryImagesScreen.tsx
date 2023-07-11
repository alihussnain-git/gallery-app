import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ListRenderItem,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GalleryImage} from '../../api/galleryImages';
import useGalleryImages from '../../react-query/useGalleryImages';
import FullImageModel from '../../components/FullImageModel';
import GalleryImageItem from './components/GalleryImageItem';
import {strings} from '../../locale/strings';
import appTheme from '../../theme/appTheme';
import icons from '../../assets/icons/icons';
import {StackNavigatorProps} from '../../navigation/RootNavigator';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';
import TestId from '../../utils/testId';

const screenHeight = Dimensions.get('window').height;
const GalleryImagesScreen: React.FC = () => {
  const {data: images, isLoading, isSuccess, isError} = useGalleryImages();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<StackNavigatorProps, NavigationRoutes.Comments>
    >();

  const [fullScreenModalImage, seFullScreenModalImage] =
    useState<GalleryImage>();

  const memoizedModelImage = useMemo(
    () => fullScreenModalImage,
    [fullScreenModalImage],
  );
  const galleryImageHeight = useMemo(() => screenHeight / 4 || 0, []);

  const handleCloseModal = () => {
    seFullScreenModalImage(undefined);
  };

  const keyExtractor = useCallback((item: GalleryImage) => item.id, []);

  const renderItem = useCallback<ListRenderItem<GalleryImage>>(
    ({item}) => {
      const {download_url} = item;
      return (
        <GalleryImageItem
          onPress={() => seFullScreenModalImage(item)}
          url={download_url}
          imageHeight={galleryImageHeight}
        />
      );
    },
    [galleryImageHeight],
  );

  const openComments = (image?: GalleryImage) => {
    if (image) {
      handleCloseModal();
      navigation.navigate(NavigationRoutes.Comments, {id: image.id});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FullImageModel
        visible={!!fullScreenModalImage}
        image={memoizedModelImage}
        close={handleCloseModal}
        openComments={openComments}
      />
      {isSuccess && (
        <>
          <Image style={styles.logo} source={icons.logo} />
          <Text style={styles.subText}>{strings.galleryScreen.appTitle}</Text>
          {images.length === 0 ? (
            <Text style={styles.emptyText}>
              {strings.galleryScreen.noImagesAvailable}
            </Text>
          ) : (
            <FlatList
              data={images}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.flatList}
            />
          )}
        </>
      )}
      {isError && (
        <>
          <Text style={styles.errorText}>
            {strings.galleryScreen.somethingWentWrong}
          </Text>
          <Text style={styles.errorText}>
            {strings.galleryScreen.checkInternetConnection}
          </Text>
        </>
      )}
      {isLoading && <ActivityIndicator testID={TestId.loadingIndicator} />}
    </SafeAreaView>
  );
};

export default GalleryImagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.black,
    justifyContent: 'center',
  },
  logo: {
    height: 40,
    width: 120,
    alignSelf: 'center',
    marginTop: appTheme.spacing.small,
  },
  subText: {
    fontSize: appTheme.typography.fontSizes.h5,
    fontFamily: appTheme.typography.fontFamily.bold,
    color: appTheme.colors.white,
    alignSelf: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: appTheme.typography.fontSizes.p,
  },
  flatList: {
    marginStart: 6,
    marginTop: appTheme.spacing.small,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: appTheme.typography.fontSizes.h5,
    marginVertical: appTheme.spacing.medium,
    fontFamily: appTheme.typography.fontFamily.medium,
    color: appTheme.colors.white,
  },
});
