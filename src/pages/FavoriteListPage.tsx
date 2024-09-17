import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks';

export const FavoriteListPage = memo(() => {
  const favoriteContacts = useAppSelector(state => {
    return state.contacts.data.filter(({ id }) =>
      state.favoriteContacts.data.includes(id)
    );
  });

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
