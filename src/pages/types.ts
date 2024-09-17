import { State } from 'src/types/common';
import { ContactDto } from 'src/types/dto/ContactDto';
import { FavoriteContactsDto } from 'src/types/dto/FavoriteContactsDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export interface CommonPageProps {
  favoriteContactsState: State<FavoriteContactsDto>;
  groupContactsState: State<GroupContactsDto[]>;
}
