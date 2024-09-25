import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Empty } from 'src/components/Empty';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks';
import { GroupCard } from 'src/components/GroupCard';
import { selectGroup, selectGroupContacts } from 'src/redux/selectors';

export const GroupPage = memo(() => {
  const { groupId } = useParams<{ groupId: string }>();

  const group = useAppSelector(state => selectGroup(state, groupId));

  const groupContacts = useAppSelector(state =>
    selectGroupContacts(state, groupId)
  );

  return (
    <Row className='g-4'>
      {group ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className='mx-auto'>
                <GroupCard group={group} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row xxl={4} className='g-4'>
              {groupContacts.map(contact => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink groupId={group.id} />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});
