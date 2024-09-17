import { ContactDto } from 'src/types/dto/ContactDto';

export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const ADD_FAVORITE_CONTACT = 'ADD_FAVORITE_CONTACT';
export const REMOVE_FAVORITE_CONTACT = 'REMOVE_FAVORITE_CONTACT';

interface SetContactsAction {
  type: typeof SET_CONTACTS;
  payload: { contacts: ContactDto[] };
}

interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: { contact: ContactDto };
}

interface RemoveContactAction {
  type: typeof REMOVE_CONTACT;
  payload: { id: string };
}

interface AddFavoriteContactAction {
  type: typeof ADD_FAVORITE_CONTACT;
  payload: { id: string };
}

interface RemoveFavoriteContactAction {
  type: typeof REMOVE_FAVORITE_CONTACT;
  payload: { id: string };
}

export type ProjectActions =
  | SetContactsAction
  | AddContactAction
  | RemoveContactAction
  | AddFavoriteContactAction
  | RemoveFavoriteContactAction;
