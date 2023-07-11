import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import GalleryImagesScreen from './GalleryImagesScreen';
import useGalleryImages from '../../react-query/useGalleryImages';
import {testImageUrl} from '../../mocks/mocks';
import TestId from '../../utils/testId';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';

const galleryImages = [
  {id: '1', download_url: testImageUrl},
  {id: '2', download_url: testImageUrl},
  {id: '3', download_url: testImageUrl},
];

// Mock the useGalleryImages hook
jest.mock('../../react-query/useGalleryImages');
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('GalleryImagesScreen', () => {
  it('renders loading indicator while fetching data', () => {
    // Mock the loading state
    (useGalleryImages as jest.Mock).mockReturnValue({isLoading: true});

    const {getByTestId} = render(
      <NavigationContainer>
        <GalleryImagesScreen />
      </NavigationContainer>,
    );

    // Assert that the loading indicator is rendered
    expect(getByTestId(TestId.loadingIndicator)).toBeTruthy();
  });

  it('renders error message if there is an error', async () => {
    // Mock the error state
    (useGalleryImages as jest.Mock).mockReturnValue({isError: true});

    const {findByText} = render(
      <NavigationContainer>
        <GalleryImagesScreen />
      </NavigationContainer>,
    );

    // Wait for the error message to be rendered
    const errorMessage = await findByText('Something went wrong!');
    expect(errorMessage).toBeTruthy();
  });

  it('renders gallery images when data is available', async () => {
    // Mock the success state with dummy data

    (useGalleryImages as jest.Mock).mockReturnValue({
      isSuccess: true,
      data: galleryImages,
    });

    const {findAllByTestId} = render(
      <NavigationContainer>
        <GalleryImagesScreen />
      </NavigationContainer>,
    );

    // Wait for the gallery images to be rendered
    const imageItems = await findAllByTestId(TestId.galleryImage);
    expect(imageItems).toHaveLength(galleryImages.length);
  });

  it('navigates to CommentsScreen when openComments is called', async () => {
    // Mock the success state with dummy data

    (useGalleryImages as jest.Mock).mockReturnValue({
      isSuccess: true,
      data: galleryImages,
    });

    const {getByTestId, findAllByTestId, findByTestId} = render(
      <NavigationContainer>
        <GalleryImagesScreen />
      </NavigationContainer>,
    );

    // Find a gallery image item and click on it
    const imageItems = await findAllByTestId(TestId.galleryImage);
    fireEvent.press(imageItems[0]);

    // Wait for the FullImageModel to be rendered
    const fullImageModel = await findByTestId(TestId.imageModal);
    expect(fullImageModel).toBeTruthy();

    // Simulate opening comments
    fireEvent.press(getByTestId(TestId.openCommentsButton));

    // Assert that the navigation to CommentsScreen occurred
    expect(mockedNavigate).toHaveBeenCalledWith(NavigationRoutes.Comments, {
      id: '1',
    });
  });
});
