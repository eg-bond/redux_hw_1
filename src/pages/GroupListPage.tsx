import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupCard } from 'src/components/GroupCard';
import { useAppSelector } from 'src/redux/hooks';

export const GroupListPage = memo(() => {
  const groupsState = useAppSelector(state => state.groups.data);

  return (
    <Row xxl={4}>
      {groupsState.map(group => (
        <Col key={group.id}>
          <GroupCard group={group} withLink />
        </Col>
      ))}
    </Row>
  );
});
