import { ContactDto } from './ContactDto';

export interface GroupDto {
  id: string;
  /** Название */
  name: string;
  /** Описание группы */
  description: string;
  /** Фото */
  photo: string;
  contactIds: ContactDto['id'][];
}
