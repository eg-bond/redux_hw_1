import { memo } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { removeContact } from 'src/redux/contacts';
import { useModal } from 'src/hooks/useModal';
import { AddContactToGroupModal } from './AddContactToGroupModal';
import {
  addContactToFavorite,
  removeContactFromFavorite,
} from 'src/redux/favorite';
import {
  removeContactFromAllGroups,
  removeContactFromGroup,
} from 'src/redux/groups';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
  groupId?: string;
}

export const ContactCard = memo<ContactCardProps>(
  ({
    contact: { photo, id, name, phone, birthday, address },
    withLink,
    groupId,
  }) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => state.favorite.includes(id));

    const { show, handleClose, handleShow } = useModal();

    const deleteContact = (id: string) => {
      dispatch(removeContact({ id }));
      dispatch(removeContactFromAllGroups({ id }));
      dispatch(removeContactFromFavorite({ id }));
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
                  onClick={() => dispatch(removeContactFromFavorite({ id }))}
                  variant='warning'>
                  Remove from favorite
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(addContactToFavorite({ id }))}
                  variant='success'>
                  Add to favorite
                </Button>
              )}

              {groupId ? (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() =>
                    dispatch(removeContactFromGroup({ contactId: id, groupId }))
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
