import { applyMiddleware, createStore } from 'redux';
import { contactsReduser } from './contactsReducer';

import { thunk } from 'redux-thunk';

const rootReducer = contactsReduser;

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
