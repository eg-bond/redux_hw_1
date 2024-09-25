import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';
import data_contacts from './data_contacts.json';
import data_groups from './data_groups.json';
import { generateUUID } from 'src/helpers/generateUUID';
import { DEFAULT_IMAGE } from 'src/constants/general';
import { GroupDto } from 'src/types/dto/GroupDto';

interface AddContactData {
  name: string;
  phone: string;
  birthday: string;
  address: string;
}

export const contactsStore = makeAutoObservable({
  contacts: data_contacts as ContactDto[],

  addContact: (addContactData: AddContactData) => {
    const newContact = {
      id: generateUUID(),
      name: addContactData.name,
      phone: addContactData.phone,
      birthday: addContactData.birthday,
      address: addContactData.address,
      photo: DEFAULT_IMAGE,
    };
    contactsStore.contacts.push(newContact);
  },

  removeContact(id: string) {
    contactsStore.contacts.filter(contact => contact.id !== id);
  },
});

export const groupsStore = makeAutoObservable({
  groups: data_groups as GroupDto[],

  addGroup: ({ name, description }: { name: string; description: string }) => {
    const newGroup = {
      id: generateUUID(),
      name: name,
      description: description,
      photo: DEFAULT_IMAGE,
      contactIds: [],
    };
    groupsStore.groups.push(newGroup);
  },

  removeContact(id: string) {
    groupsStore.groups.filter(group => group.id !== id);
  },

  addContactToGroup(contactId: string, groupId: string) {
    const group = groupsStore.groups.find(group => group.id === groupId);
    if (group && !group.contactIds.includes(contactId)) {
      group.contactIds.push(contactId);
    }
  },

  removeContactFromGroup(contactId: string, groupId: string) {
    const group = groupsStore.groups.find(group => group.id === groupId);
    if (group) {
      group.contactIds = group.contactIds.filter(id => id !== contactId);
    }
  },

  removeContactFromAllGroups(contactId: string) {
    groupsStore.groups = groupsStore.groups.map(group => ({
      ...group,
      contactIds: group.contactIds.filter(id => id !== contactId),
    }));
  },
});

export const favoriteStore = makeAutoObservable({
  favorite: [] as string[],
  addContactToFavorite: (id: string) => {
    if (!favoriteStore.favorite.includes(id)) {
      favoriteStore.favorite.push(id);
    }
  },
  removeContactFromFavorite(contactId: string) {
    favoriteStore.favorite = favoriteStore.favorite.filter(
      id => id !== contactId
    );
  },
});
