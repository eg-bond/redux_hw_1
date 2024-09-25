import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { groupsStore } from 'src/mobx/store';
import { GroupDto } from 'src/types/dto/GroupDto';

interface GroupCardProps {
  group: GroupDto;
  withLink?: boolean;
}

export const GroupCard = ({
  group: { id, name, description, photo, contactIds },
  withLink,
}: GroupCardProps) => {
  return (
    <Card key={id}>
      <Card.Header>
        {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
      </Card.Header>
      <Card.Body>{description}</Card.Body>
      <Card.Img variant='top' src={photo} />
      <Card.Body>
        <Button onClick={() => groupsStore.removeGroup(id)} variant='danger'>
          Remove
        </Button>
      </Card.Body>

      <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
    </Card>
  );
};
