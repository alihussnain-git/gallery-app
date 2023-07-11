import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CommentsScreen from './CommentsScreen';
import {Alert} from 'react-native';
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
        type: 'comments/populateComment',
        payload: {id: '1', comments: ['New comment']},
      },
    ]);
  });

  it('updates a comment', async () => {
    const store = mockStore({
      comments: {
        '1': ['Comment 1', 'Comment 2'],
      },
    });

    const {findAllByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CommentsScreen
            route={routeMock}
            navigation={navigationMock as any}
          />
        </NavigationContainer>
      </Provider>,
    );
    const editButtons = await findAllByTestId(TestId.editCommentButton);
    fireEvent.press(editButtons[0]);

    const updatedCommentInput = await findAllByTestId(TestId.commentInput);
    expect(updatedCommentInput[0]).toBeTruthy();
    const updateButton = await findAllByTestId(TestId.sendCommentButton);

    fireEvent.changeText(updatedCommentInput[0], 'Updated comment');
    fireEvent.press(updateButton[0]);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'comments/populateComment',
        payload: {
          id: '1',
          comments: ['Updated comment', 'Comment 2'],
        },
      },
    ]);
  });
  it('deletes a comment', async () => {
    const store = mockStore({
      comments: {
        '1': ['Comment 1', 'Comment 2'],
      },
    });
    // Mock the Alert.alert function
    const mockAlert = jest.spyOn(Alert, 'alert');
    mockAlert.mockImplementation((title, message, buttons) => {
      // Simulate pressing the "Delete" button
      if (buttons && buttons.length >= 2) {
        // Simulate pressing the "Delete" button
        buttons[1].onPress?.();
      }
    });

    const {findAllByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CommentsScreen
            route={routeMock}
            navigation={navigationMock as any}
          />
        </NavigationContainer>
      </Provider>,
    );

    const deleteButton = await findAllByTestId(TestId.deleteCommentButton);
    fireEvent.press(deleteButton[0]);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'comments/populateComment',
        payload: {
          id: '1',
          comments: ['Comment 2'],
        },
      },
    ]);
  });
});
