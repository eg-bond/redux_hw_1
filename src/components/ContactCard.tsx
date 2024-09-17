import { memo } from 'react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/redux/hooks';
import { removeContactActionCreator } from 'src/redux/actions';

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = memo<ContactCardProps>(
  ({ contact: { photo, id, name, phone, birthday, address }, withLink }) => {
    const dispatch = useAppDispatch();
    return (
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
          <Button
            onClick={() => dispatch(removeContactActionCreator(id))}
            variant='danger'>
            Remove
          </Button>
        </Card.Body>
      </Card>
    );
  }
);
