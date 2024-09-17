import { combineReducers, createStore } from 'redux';
import { contactReduser } from './contactsReduser';
import { favoriteContactsReduser } from './favoriteContacts';
import { groupContactsReduser } from './groupContactsReducer';

const rootReducer = combineReducers({
  contacts: contactReduser,
  favorite: favoriteContactsReduser,
  group: groupContactsReduser,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
