import { configureStore } from '@reduxjs/toolkit';

import { reducer as ProfileReducer } from './slices/profile';

export const reduxStore = configureStore({
  reducer: ProfileReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
