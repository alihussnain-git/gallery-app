import {createStore} from '@reduxjs/toolkit';
import commentsReducer, {
  populateComment,
  commentsSelector,
} from './commentsSlice';

const id = '1';

describe('commentsSlice', () => {
  it('should populate comments for an image', () => {
    const store = createStore(commentsReducer);
    const comments = ['Comment 1', 'Comment 2'];

    store.dispatch(populateComment({id, comments}));

    const state = store.getState();
    expect(state[id]).toEqual(comments);
  });

  it('should return comments for a specific image', () => {
    const comments = ['Comment 1', 'Comment 2'];
    const rootState = {comments: {[id]: comments}};

    const selectedComments = commentsSelector(rootState, id);

    expect(selectedComments).toEqual(comments);
  });
});
