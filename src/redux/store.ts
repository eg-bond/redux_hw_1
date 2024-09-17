import { combineReducers, createStore } from 'redux';
import { contactsReduser } from './contactsReducer';
import { favoriteContactsReducer } from './favoriteContactsReducer';
import { groupsReduser } from './groupsReducer';

const rootReducer = combineReducers({
  contacts: contactsReduser,
  favoriteContacts: favoriteContactsReducer,
  groups: groupsReduser,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
