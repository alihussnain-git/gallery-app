import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface CommentsState {
  [key: string]: string[];
}

interface AddComment {
  id: string;
  comments: string[];
}

interface UpdateComment {
  id: string;
  comment: string;
  indexToUpdate: number;
}

interface DeleteComment {
  id: string;
  indexToDelete: number;
}

const initialState: CommentsState = {};
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<AddComment>) => {
      const {id, comments} = action.payload;
      state[id] = comments;
    },

    updateComment: (state, action: PayloadAction<UpdateComment>) => {
      const {id, comment, indexToUpdate} = action.payload;
      const updatedComments = [...state[id]];
      updatedComments[indexToUpdate] = comment;
      state[id] = updatedComments;
    },

    deleteComment: (state, action: PayloadAction<DeleteComment>) => {
      const {id, indexToDelete} = action.payload;
      const updatedComments = state[id].filter(
        (_, index) => index !== indexToDelete,
      );
      state[id] = updatedComments;
    },
  },
});
export const {addComment, updateComment, deleteComment} = commentsSlice.actions;
export const commentsSelector = (state: RootState, id: string) =>
  state.comments[id];
export default commentsSlice.reducer;
