import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GalleryImageItem from './GalleryImageItem';
import {testImageUrl} from '../../../mocks/mocks';
import TestId from '../../../utils/testId';

describe('GalleryImageItem', () => {
  const mockUrl = testImageUrl;
  const mockOnPress = jest.fn();
  const mockImageHeight = 200;

  it('renders the component correctly', () => {
    const {getByTestId} = render(
      <GalleryImageItem
        url={mockUrl}
        onPress={mockOnPress}
        imageHeight={mockImageHeight}
      />,
    );

    const container = getByTestId(TestId.galleryImage);

    expect(container).toBeTruthy();
  });

  it('calls onPress function when pressed', () => {
    const {getByTestId} = render(
      <GalleryImageItem
        url={mockUrl}
        onPress={mockOnPress}
        imageHeight={mockImageHeight}
      />,
    );

    const image = getByTestId(TestId.galleryImage);

    fireEvent.press(image);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
