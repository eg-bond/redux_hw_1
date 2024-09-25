import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useModal } from 'src/hooks/useModal';
import { AddContactToGroupModal } from './AddContactToGroupModal';
import { observer } from 'mobx-react-lite';
import { contactsStore, favoriteStore, groupsStore } from 'src/mobx/store';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
  groupId?: string;
}

export const ContactCard = observer<ContactCardProps>(
  ({
    contact: { photo, id, name, phone, birthday, address },
    withLink,
    groupId,
  }) => {
    const isFavorite = favoriteStore.favorite.includes(id);

    const { show, handleClose, handleShow } = useModal();

    const deleteContact = (id: string) => {
      contactsStore.removeContact(id);
      groupsStore.removeContactFromAllGroups(id);
      favoriteStore.removeContactFromFavorite(id);
    };

    return (
      <>
        <AddContactToGroupModal
          handleClose={handleClose}
          show={show}
          contactId={id}
        />
        <Card key={id}>
          <Card.Img variant='top' src={photo} />
          <Card.Body>
            <Card.Title>
              {withLink ? <Link to={`/contact/${id}`}>{name}</Link> : name}
            </Card.Title>

            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Link to={`tel:${phone}`} target='_blank'>
                    {phone}
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>{birthday}</ListGroup.Item>
                <ListGroup.Item>{address}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Body>
              {isFavorite ? (
                <Button
                  onClick={() => favoriteStore.removeContactFromFavorite(id)}
                  variant='warning'>
                  Remove from favorite
                </Button>
              ) : (
                <Button
                  onClick={() => favoriteStore.addContactToFavorite(id)}
                  variant='success'>
                  Add to favorite
                </Button>
              )}

              {groupId ? (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() =>
                    groupsStore.removeContactFromGroup(id, groupId)
                  }
                  variant='dark'>
                  Remove from current group
                </Button>
              ) : (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() => handleShow()}
                  variant='info'>
                  Add to group
                </Button>
              )}
            </Card.Body>

            <Button onClick={() => deleteContact(id)} variant='danger'>
              Delete contact
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
);
