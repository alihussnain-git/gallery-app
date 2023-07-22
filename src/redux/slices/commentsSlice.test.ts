import {createStore} from '@reduxjs/toolkit';
import commentsReducer, {
  addComment,
  commentsSelector,
  deleteComment,
  updateComment,
} from './commentsSlice';

const id = '1';
const store = createStore(commentsReducer);

describe('commentsSlice', () => {
  it('should add comments for an image', () => {
    const comments = ['Comment 1', 'Comment 2'];
    store.dispatch(addComment({id, comments}));
    const state = store.getState();
    expect(state[id]).toEqual(comments);
  });

  it('should update comments for an image', () => {
    const comments = ['Comment 1', 'Comment 2'];
    store.dispatch(addComment({id, comments}));
    store.dispatch(updateComment({id, comment: 'update', indexToUpdate: 0}));
    const state = store.getState();
    expect(state[id]).toEqual(['update', 'Comment 2']);
  });

  it('should delete comments for an image', () => {
    const comments = ['Comment 1', 'Comment 2'];
    store.dispatch(addComment({id, comments}));
    store.dispatch(deleteComment({id, indexToDelete: 0}));
    const state = store.getState();
    expect(state[id]).toEqual(['Comment 2']);
  });

  it('should return comments for a specific image', () => {
    const comments = ['Comment 1', 'Comment 2'];
    const rootState = {comments: {[id]: comments}};
    const selectedComments = commentsSelector(rootState, id);
    expect(selectedComments).toEqual(comments);
  });
});
