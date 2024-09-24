import { Button, Spinner } from 'react-bootstrap';

interface ILoadingButton {
  text: string;
}
export function LoadingButton({ text }: ILoadingButton) {
  return (
    <Button variant='primary' disabled>
      <Spinner
        as='span'
        animation='grow'
        size='sm'
        role='status'
        aria-hidden='true'
      />
      {text}
    </Button>
  );
}
