import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FullImageModel from './FullImageModel';
import {GalleryImage} from '../api/galleryImages';
import {testImageUrl} from '../mocks/mocks';
import TestId from '../utils/testId';

const image: GalleryImage | undefined = {
  id: '1',
  download_url: testImageUrl,
  height: 100,
  width: 100,
  url: testImageUrl,
  author: 'John',
};

describe('FullImageModel', () => {
  it('renders correctly when visible is true', () => {
    const closeMock = jest.fn();
    const openCommentsMock = jest.fn();

    const {getByTestId, getByText} = render(
      <FullImageModel
        visible={true}
        image={image}
        close={closeMock}
        openComments={openCommentsMock}
      />,
    );

    // Assert that the FullImageModel is rendered
    const modalContainer = getByTestId(TestId.imageModal);
    expect(modalContainer).toBeTruthy();

    // Assert that the Close button is rendered
    const closeButton = getByText('Close');
    expect(closeButton).toBeTruthy();

    // Assert that the Comments button is rendered
    const commentsButton = getByTestId(TestId.openCommentsButton);
    expect(commentsButton).toBeTruthy();

    // Assert that the image is rendered
    const modalImage = getByTestId('modal-image');
    expect(modalImage).toBeTruthy();
  });

  it('calls the close function when the Close button is pressed', () => {
    const closeMock = jest.fn();
    const openCommentsMock = jest.fn();

    const {getByText} = render(
      <FullImageModel
        visible={true}
        image={image}
        close={closeMock}
        openComments={openCommentsMock}
      />,
    );

    // Find the Close button and press it
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    // Assert that the close function is called
    expect(closeMock).toHaveBeenCalled();
  });

  it('calls the openComments function when the Comments button is pressed', () => {
    const closeMock = jest.fn();
    const openCommentsMock = jest.fn();

    const {getByTestId} = render(
      <FullImageModel
        visible={true}
        image={image}
        close={closeMock}
        openComments={openCommentsMock}
      />,
    );

    // Find the Comments button and press it
    const commentsButton = getByTestId(TestId.openCommentsButton);
    fireEvent.press(commentsButton);

    // Assert that the openComments function is called with the correct image
    expect(openCommentsMock).toHaveBeenCalledWith(image);
  });
});
