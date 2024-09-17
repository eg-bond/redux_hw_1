import { combineReducers, createStore } from 'redux';
import { contactsReduser } from './contactsReducer';
import { favoriteContactsReducer } from './favoriteContactsReducer';
import { groupContactsReduser } from './groupContactsReducer';

const rootReducer = combineReducers({
  contacts: contactsReduser,
  favoriteContacts: favoriteContactsReducer,
  groups: groupContactsReduser,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
