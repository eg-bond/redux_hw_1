import { ThunkAction } from 'redux-thunk';
import { ContactDto } from 'src/types/dto/ContactDto';
import { RootState } from './store';
import { GroupDto } from 'src/types/dto/GroupDto';

export const SET_CONTACTS = 'SET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const ADD_FAVORITE_CONTACT = 'ADD_FAVORITE_CONTACT';
export const REMOVE_FAVORITE_CONTACT = 'REMOVE_FAVORITE_CONTACT';

export const SET_GROUPS = 'SET_GROUPS';

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

interface SetGroupsAction {
  type: typeof SET_GROUPS;
  payload: { groups: GroupDto[] };
}

export const removeContactActionCreator = (
  id: string
): RemoveContactAction => ({
  type: REMOVE_CONTACT,
  payload: { id },
});

export function fetchContactsAction(): ThunkAction<
  void,
  RootState,
  void,
  ProjectActions
> {
  return async dispatch => {
    const res = await fetch(
      'https://mocki.io/v1/ee3adc33-09ee-4cb1-a9c3-570bd79e4aae'
    );
    const data = (await res.json()) as ContactDto[];

    dispatch({ type: SET_CONTACTS, payload: { contacts: data } });
  };
}

export function fetchGroupsAction(): ThunkAction<
  void,
  RootState,
  void,
  ProjectActions
> {
  return async dispatch => {
    const res = await fetch(
      'https://mocki.io/v1/7c59ee06-f0f1-4795-9837-33e3b2964174'
    );
    const data = (await res.json()) as GroupDto[];

    dispatch({ type: SET_GROUPS, payload: { groups: data } });
  };
}

export type ProjectActions =
  | SetContactsAction
  | AddContactAction
  | RemoveContactAction
  | AddFavoriteContactAction
  | RemoveFavoriteContactAction
  | SetGroupsAction;
