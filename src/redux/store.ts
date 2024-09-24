import { configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contacts';
import { apiSlice } from './contacts/api';

// const rootReducer = contactReducer;

// export const store = configureStore({
//   reducer: rootReducer,
//   devTools: true,
// });
export const store = configureStore({
  reducer: { contactReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
