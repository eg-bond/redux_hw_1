import { ThunkAction } from 'redux-thunk';
import { ContactDto } from 'src/types/dto/ContactDto';
import { RootState } from './store';
import { GroupDto } from 'src/types/dto/GroupDto';

export const SET_CONTACTS = 'SET_CONTACTS';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';

export const ADD_CONTACT_TO_FAVORITE = 'ADD_CONTACT_TO_FAVORITE';
export const ADD_CONTACT_FROM_FAVORITE = 'ADD_CONTACT_FROM_FAVORITE';

export const SET_GROUPS = 'SET_GROUPS';
export const REMOVE_GROUP = 'REMOVE_GROUP';

interface SetContactsAction {
  type: typeof SET_CONTACTS;
  payload: { contacts: ContactDto[] };
}

interface RemoveContactAction {
  type: typeof REMOVE_CONTACT;
  payload: { id: string };
}

interface AddContactToFavoriteAction {
  type: typeof ADD_CONTACT_TO_FAVORITE;
  payload: { id: string };
}

interface RemoveContactFromFavoriteAction {
  type: typeof ADD_CONTACT_FROM_FAVORITE;
  payload: { id: string };
}

interface SetGroupsAction {
  type: typeof SET_GROUPS;
  payload: { groups: GroupDto[] };
}

interface RemoveGroupAction {
  type: typeof REMOVE_GROUP;
  payload: { id: string };
}

export const AddContactToFavoriteAC = (
  id: string
): AddContactToFavoriteAction => ({
  type: ADD_CONTACT_TO_FAVORITE,
  payload: { id },
});

export const RemoveContactFromFavoriteAC = (
  id: string
): RemoveContactFromFavoriteAction => ({
  type: ADD_CONTACT_FROM_FAVORITE,
  payload: { id },
});

export const removeContactActionCreator = (
  id: string
): RemoveContactAction => ({
  type: REMOVE_CONTACT,
  payload: { id },
});

export const removeGroupActionCreator = (id: string): RemoveGroupAction => ({
  type: REMOVE_GROUP,
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
  | RemoveContactAction
  | AddContactToFavoriteAction
  | RemoveContactFromFavoriteAction
  | SetGroupsAction
  | RemoveGroupAction;
