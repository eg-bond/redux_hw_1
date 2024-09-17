import { combineReducers, createStore } from 'redux';
import { contactReduser } from './contactsReduser';
import { favoriteContactsReduser } from './favoriteContacts';

const rootReducer = combineReducers({
  contacts: contactReduser,
  favoriteContacts: favoriteContactsReduser,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
