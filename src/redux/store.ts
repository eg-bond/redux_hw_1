import { contactsReduser } from './contactsReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = contactsReduser;

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
