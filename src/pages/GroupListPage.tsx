import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const groupContactsState = useAppSelector(state => state.group.contacts);

  return (
    <Row xxl={4}>
      {groupContactsState.map(contact => (
        <Col key={contact.id}>
          <GroupContactsCard groupContacts={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});
