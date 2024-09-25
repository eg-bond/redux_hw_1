import { makeAutoObservable } from 'mobx';
import { contactsStore } from './contactsStore';
import { ContactDto } from 'src/types/dto/ContactDto';

const makeFavoriteContactsArr = (): ContactDto[] => {
  return contactsStore.contacts.filter(({ id }) =>
    favoriteStore.favorite.includes(id)
  );
};

export const favoriteStore = makeAutoObservable({
  favorite: [] as string[],
  get favoriteContacts() {
    return makeFavoriteContactsArr();
  },
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
