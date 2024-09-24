import { groupsReducer } from './groups';
import { favoriteReducer } from './favorite';
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts';
import { apiSliceContacts } from './contacts/api';
import { apiSliceGroups } from './groups/api';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    groups: groupsReducer,
    favorite: favoriteReducer,
    [apiSliceContacts.reducerPath]: apiSliceContacts.reducer,
    [apiSliceGroups.reducerPath]: apiSliceGroups.reducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      apiSliceContacts.middleware,
      apiSliceGroups.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
