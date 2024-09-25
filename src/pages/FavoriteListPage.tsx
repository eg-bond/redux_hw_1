import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { favoriteStore } from 'src/mobx/favoriteStore';

export const FavoriteListPage = observer(() => {
  const favoriteContacts = favoriteStore.favoriteContacts;

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
