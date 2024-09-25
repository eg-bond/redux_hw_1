import { makeAutoObservable } from 'mobx';
import { ContactDto } from 'src/types/dto/ContactDto';
import { generateUUID } from 'src/helpers/generateUUID';
import { CONTACTS_URL, DEFAULT_IMAGE, GROUPS_URL } from 'src/constants/general';
import { GroupDto } from 'src/types/dto/GroupDto';

interface AddContactData {
  name: string;
  phone: string;
  birthday: string;
  address: string;
}

export const contactsStore = makeAutoObservable({
  contacts: [] as ContactDto[],
  isLoading: false,
  isError: false,

  *fetchContacts() {
    this.isLoading = true;
    try {
      const response: ContactDto[] = yield fetch(CONTACTS_URL).then(res =>
        res.json()
      );
      this.contacts = response;
    } catch (error) {
      this.isError = true;
      this.contacts = [];
    } finally {
      this.isLoading = false;
    }
  },

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
    contactsStore.contacts = contactsStore.contacts.filter(
      contact => contact.id !== id
    );
  },
});

export const groupsStore = makeAutoObservable({
  groups: [] as GroupDto[],
  isLoading: false,
  isError: false,

  *fetchGroups() {
    this.isLoading = true;
    try {
      const response: GroupDto[] = yield fetch(GROUPS_URL).then(res =>
        res.json()
      );
      this.groups = response;
    } catch (error) {
      this.isError = true;
      this.groups = [];
    } finally {
      this.isLoading = false;
    }
  },

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

  removeGroup(id: string) {
    groupsStore.groups = groupsStore.groups.filter(group => group.id !== id);
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

// function isFavorite(id: string) {
//   favoriteStore.favorite.includes(id);
// }

export const favoriteStore = makeAutoObservable({
  favorite: [] as string[],
  // get isFavorite() {
  //   return this.favorite.length > 0;
  // },
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

//@ts-ignore
window.group = groupsStore;
