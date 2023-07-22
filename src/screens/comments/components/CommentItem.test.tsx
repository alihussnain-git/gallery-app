import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CommentItem} from './CommentItem';
import TestId from '../../../utils/testId';
import configureStore from 'redux-mock-store';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);

const comment = 'This is a comment';
const store = mockStore({
  comments: {
    '0': ['Comment 1', 'Comment 2'],
  },
});

describe('CommentItem', () => {
  it('renders the comment text', () => {
    const {getByText} = render(
      <Provider store={store}>
        <CommentItem index={0} id={'0'} comment={comment} />,
      </Provider>,
    );

    expect(getByText(comment)).toBeTruthy();
  });

  it('updates a comment', async () => {
    const updateStore = mockStore({
      comments: {
        '0': ['Comment 1', 'Comment 2'],
      },
    });
    const {getByTestId} = render(
      <Provider store={updateStore}>
        <CommentItem index={0} id={'0'} comment={comment} />,
      </Provider>,
    );
    const editButtons = await getByTestId(TestId.editCommentButton);
    fireEvent.press(editButtons);

    const updatedCommentInput = await getByTestId(TestId.commentInput);
    expect(updatedCommentInput).toBeTruthy();
    const updateButton = await getByTestId(TestId.sendCommentButton);

    fireEvent.changeText(updatedCommentInput, 'Updated comment');
    fireEvent.press(updateButton);

    const actions = updateStore.getActions();
    expect(actions).toEqual([
      {
        type: 'comments/updateComment',
        payload: {
          id: '0',
          indexToUpdate: 0,
          comment: 'Updated comment',
        },
      },
    ]);
  });

  it('deletes a comment', async () => {
    // Mock the Alert.alert function
    const mockAlert = jest.spyOn(Alert, 'alert');
    mockAlert.mockImplementation((title, message, buttons) => {
      // Simulate pressing the "Delete" button
      if (buttons && buttons.length >= 2) {
        // Simulate pressing the "Delete" button
        buttons[1].onPress?.();
      }
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <CommentItem index={0} id={'0'} comment={comment} />,
      </Provider>,
    );

    const deleteButton = await getByTestId(TestId.deleteCommentButton);
    fireEvent.press(deleteButton);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'comments/deleteComment',
        payload: {
          id: '0',
          indexToDelete: 0,
        },
      },
    ]);
  });

  it('switches to edit mode when edit button is pressed', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <CommentItem index={0} id={'0'} comment={comment} />,
      </Provider>,
    );

    fireEvent.press(getByTestId(TestId.editCommentButton));
    expect(getByTestId(TestId.commentInput)).toBeTruthy();
  });

  it('cancels edit mode when cancel button is pressed', () => {
    const {getByTestId, queryByTestId} = render(
      <Provider store={store}>
        <CommentItem index={0} id={'0'} comment={comment} />,
      </Provider>,
    );
    fireEvent.press(getByTestId(TestId.editCommentButton));
    fireEvent.press(getByTestId(TestId.cancelCommentButton));

    expect(queryByTestId(TestId.commentInput)).toBeFalsy();
  });
});
