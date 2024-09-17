import { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GroupDto } from 'src/types/dto/GroupDto';

interface GroupCardProps {
  group: GroupDto;
  withLink?: boolean;
}

export const GroupCard = memo<GroupCardProps>(
  ({ group: { id, name, description, photo, contactIds }, withLink }) => {
    return (
      <Card key={id}>
        <Card.Header>
          {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
        </Card.Header>
        <Card.Body>{description}</Card.Body>
        <Card.Img variant='top' src={photo} />
        <Card.Footer>Contacts: {contactIds.length}</Card.Footer>
      </Card>
    );
  }
);
