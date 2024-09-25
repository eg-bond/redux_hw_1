import { makeAutoObservable } from 'mobx';

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
