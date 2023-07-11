import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CommentItem} from './CommentItem';
import TestId from '../../../utils/testId';

describe('CommentItem', () => {
  it('renders the comment text', () => {
    const comment = 'This is a comment';
    const {getByText} = render(
      <CommentItem
        comment={comment}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />,
    );

    expect(getByText(comment)).toBeTruthy();
  });

  it('calls the onDelete function when delete button is pressed', () => {
    const onDelete = jest.fn();
    const {getByTestId} = render(
      <CommentItem
        comment="Some comment"
        onDelete={onDelete}
        onUpdate={jest.fn()}
      />,
    );

    fireEvent.press(getByTestId(TestId.deleteCommentButton));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('switches to edit mode when edit button is pressed', () => {
    const onUpdate = jest.fn();
    const {getByTestId, getByText} = render(
      <CommentItem
        comment="Some comment"
        onDelete={jest.fn()}
        onUpdate={onUpdate}
      />,
    );

    fireEvent.press(getByTestId(TestId.editCommentButton));

    expect(getByText('Update')).toBeTruthy();
  });

  it('calls the onUpdate function with updated text when updated', () => {
    const onUpdate = jest.fn();
    const {getByTestId} = render(
      <CommentItem
        comment="Some comment"
        onDelete={jest.fn()}
        onUpdate={onUpdate}
      />,
    );

    fireEvent.press(getByTestId(TestId.editCommentButton));
    fireEvent.changeText(getByTestId(TestId.commentInput), 'Updated comment');
    fireEvent.press(getByTestId(TestId.sendCommentButton));

    expect(onUpdate).toHaveBeenCalledWith('Updated comment');
  });

  it('cancels edit mode when cancel button is pressed', () => {
    const onUpdate = jest.fn();
    const {getByTestId, queryByTestId} = render(
      <CommentItem
        comment="Some comment"
        onDelete={jest.fn()}
        onUpdate={onUpdate}
      />,
    );

    fireEvent.press(getByTestId(TestId.editCommentButton));
    fireEvent.press(getByTestId(TestId.cancelCommentButton));

    expect(queryByTestId(TestId.commentInput)).toBeFalsy();
  });
});
