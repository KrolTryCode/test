import { configureStore } from '@reduxjs/toolkit/src/configureStore';

import { userReducer } from './user/user.store';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// TODO Temporary
export const DEFAULT_PROJECT_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
