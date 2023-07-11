import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import CustomImage from './CustomImage';
import {testImageUrl} from '../mocks/mocks';
import TestId from '../utils/testId';

describe('CustomImage', () => {
  it('displays the loading indicator while the image is loading', () => {
    const {getByTestId} = render(<CustomImage source={{uri: testImageUrl}} />);

    const loadingIndicator = getByTestId(TestId.imageLoadingIndicator);
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders the image after it has loaded', async () => {
    const testID = 'custom-image-test';

    const {getByTestId, queryByTestId} = render(
      <CustomImage testID={testID} source={{uri: testImageUrl}} />,
    );
    const image = getByTestId(testID);

    // Assert that the loading indicator is initially rendered
    const loadingIndicator = getByTestId(TestId.imageLoadingIndicator);
    expect(loadingIndicator).toBeTruthy();

    // Simulate image load by calling the onLoad function
    fireEvent(image, 'onLoad');

    // Assert that the loading indicator is removed
    expect(queryByTestId(TestId.imageLoadingIndicator)).toBeNull();

    // Assert that the image is rendered
    expect(image).toBeTruthy();
  });
});
