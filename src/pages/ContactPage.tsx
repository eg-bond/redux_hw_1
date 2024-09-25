import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAppSelector } from 'src/redux/hooks';
import { selectContact } from 'src/redux/selectors';

export const ContactPage: FC = () => {
  const { contactId } = useParams<{ contactId: string }>();

  const contact = useAppSelector(state => selectContact(state, contactId));

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};
