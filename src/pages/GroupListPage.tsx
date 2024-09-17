import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const groupContactsState = useAppSelector(state => state.groups.data);

  return (
    <Row xxl={4}>
      {groupContactsState.map(group => (
        <Col key={group.id}>
          <GroupContactsCard groupContacts={group} withLink />
        </Col>
      ))}
    </Row>
  );
});
