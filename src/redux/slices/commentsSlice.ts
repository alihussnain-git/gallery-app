import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface CommentsState {
  [key: string]: string[];
}

const initialState: CommentsState = {};
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    populateComment: (
      state,
      action: PayloadAction<{id: string; comments: string[]}>,
    ) => {
      const {id, comments} = action.payload;
      state[id] = comments;
    },
  },
});
export const {populateComment} = commentsSlice.actions;
export const commentsSelector = (state: RootState, imageUrl: string) =>
  state.comments[imageUrl];
export default commentsSlice.reducer;
