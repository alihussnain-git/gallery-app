import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CommentsScreen from './CommentsScreen';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {NavigationRoutes} from '../../navigation/NavigationRoutes';
import {StackNavigatorProps} from '../../navigation/RootNavigator';
import TestId from '../../utils/testId';

const mockStore = configureStore([]);

// Mock the navigation object
const navigationMock = jest.fn();

const routeMock: RouteProp<StackNavigatorProps, NavigationRoutes.Comments> = {
  key: '',
  name: NavigationRoutes.Comments,
  params: {
    id: '1',
  },
};

describe('CommentsScreen', () => {
  it('renders the comment list', () => {
    const store = mockStore({
      comments: {
        '1': ['Comment 1', 'Comment 2', 'Comment 3'],
      },
    });

    const {getByTestId, queryByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CommentsScreen
            route={routeMock}
            navigation={navigationMock as any}
          />
        </NavigationContainer>{' '}
      </Provider>,
    );

    const commentList = getByTestId(TestId.commentsList);
    expect(commentList).toBeTruthy();
    expect(queryByText('Comment 1')).toBeTruthy();
    expect(queryByText('Comment 2')).toBeTruthy();
    expect(queryByText('Comment 3')).toBeTruthy();
  });

  it('adds a new comment', () => {
    const store = mockStore({
      comments: {
        '1': [],
      },
    });

    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CommentsScreen
            route={routeMock}
            navigation={navigationMock as any}
          />
        </NavigationContainer>
      </Provider>,
    );

    const commentInput = getByPlaceholderText('Enter a comment');
    const sendButton = getByTestId(TestId.sendCommentButton);

    fireEvent.changeText(commentInput, 'New comment');
    fireEvent.press(sendButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'comments/addComment',
        payload: {id: '1', comments: ['New comment']},
      },
    ]);
  });
});
