import { makeAutoObservable } from 'mobx';
import { CONTACTS_URL, DEFAULT_IMAGE } from 'src/constants/general';
import { generateUUID } from 'src/helpers/generateUUID';
import { ContactDto } from 'src/types/dto/ContactDto';

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
