import { applyMiddleware, combineReducers, createStore } from 'redux';
import { contactsReduser } from './contactsReducer';
import { favoriteContactsReducer } from './favoriteContactsReducer';
import { groupsReduser } from './groupsReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  contacts: contactsReduser,
  favoriteContacts: favoriteContactsReducer,
  groups: groupsReduser,
});
// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export type RootState = ReturnType<typeof rootReducer>;
