import {configureStore} from '@reduxjs/toolkit';
import commentsSlice from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
