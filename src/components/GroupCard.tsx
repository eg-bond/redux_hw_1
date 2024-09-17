import { memo } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeGroupActionCreator } from 'src/redux/actions';
import { useAppDispatch } from 'src/redux/hooks';
import { GroupDto } from 'src/types/dto/GroupDto';

interface GroupCardProps {
  group: GroupDto;
  withLink?: boolean;
}

export const GroupCard = memo<GroupCardProps>(
  ({ group: { id, name, description, photo, contactIds }, withLink }) => {
    const dispatch = useAppDispatch();

    return (
      <Card key={id}>
        <Card.Header>
          {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
        </Card.Header>
        <Card.Body>{description}</Card.Body>
        <Card.Img variant='top' src={photo} />
        <Card.Body>
          <Button
            onClick={() => dispatch(removeGroupActionCreator(id))}
            variant='danger'>
            Remove
          </Button>
        </Card.Body>

        <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
      </Card>
    );
  }
);
