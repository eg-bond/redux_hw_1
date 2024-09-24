import { memo, useState } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, Form, ListGroup, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  addContactToFavorite,
  addContactToGroup,
  removeContact,
  removeContactFromFavorite,
  removeContactFromGroup,
} from 'src/redux/contacts';

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
    const groupsState = useAppSelector(state => state.groups);
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => state.favorite.includes(id));

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(
        //@ts-ignore
        addContactToGroup({ contactId: id, groupId: e.target[1].value })
      );
      handleClose();
    };

    return (
      <>
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
                  onClick={() => dispatch(removeContactFromFavorite(id))}
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
              <Button
                style={{ marginTop: '1rem' }}
                onClick={() => handleShow()}
                variant='info'>
                Add to group
              </Button>
              {groupId && (
                <Button
                  style={{ marginTop: '1rem' }}
                  onClick={() =>
                    dispatch(removeContactFromGroup({ contactId: id, groupId }))
                  }
                  variant='dark'>
                  Remove from current group
                </Button>
              )}
            </Card.Body>

            <Button
              onClick={() => dispatch(removeContact({ id }))}
              variant='danger'>
              Delete contact
            </Button>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Choose group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Select aria-label='Default select example'>
                {groupsState.map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' type={'submit'}>
                Add to selected group
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
);
