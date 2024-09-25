import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks';
import { selectFavoriteContacts } from 'src/redux/selectors';

export const FavoriteListPage = memo(() => {
  const favoriteContacts = useAppSelector(selectFavoriteContacts);

  return (
    <Row xxl={4} className='g-4'>
      {favoriteContacts.map(contact => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
