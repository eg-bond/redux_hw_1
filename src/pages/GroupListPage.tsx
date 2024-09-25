import { observer } from 'mobx-react-lite';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { AddGroupModal } from 'src/components/AddGroupModal';
import { GroupCard } from 'src/components/GroupCard';
import { LoadingButton } from 'src/components/LoadingButton';
import { useModal } from 'src/hooks/useModal';
import { groupsStore } from 'src/mobx/store';

export const GroupListPage = observer(() => {
  const groupsState = groupsStore.groups;

  const { show, handleClose, handleShow } = useModal();

  if (groupsStore.isLoading) return <LoadingButton text='Loading...' />;

  if (groupsStore.isError) {
    return (
      <Alert variant='danger'>Some error occurred while loading data</Alert>
    );
  }

  return (
    <>
      <AddGroupModal handleClose={handleClose} show={show} />
      <Button
        style={{ marginBottom: '1rem' }}
        onClick={handleShow}
        variant='success'>
        Add new group
      </Button>
      <Col>
        <Row xxl={4}>
          {groupsState.map(group => (
            <Col key={group.id}>
              <GroupCard group={group} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </>
  );
});
