import { createStore } from 'redux';
import { contactReduser } from './contactsReduser';

const rootReducer = contactReduser;

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
