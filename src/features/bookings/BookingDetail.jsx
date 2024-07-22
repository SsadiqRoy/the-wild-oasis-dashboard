import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCheckOutBooking, useDeleteBooking, useGetBooking } from './bookingHooks';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isGettingBooking } = useGetBooking();
  const { checkout, isCheckingOut } = useCheckOutBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isGettingBooking) return <Spinner />;
  const { id: bookingId, status } = booking;

  // console.log(booking);
  const handlerCheckOut = () => checkout({ id: bookingId, data: { status: 'checked-out' } });
  const handleDelete = () => deleteBooking(bookingId, { onSettled: () => navigate(-1) });

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
          {status === 'checked-in' && (
            <Button disabled={isCheckingOut} onClick={handlerCheckOut}>
              Check out
            </Button>
          )}

          <Modal.Open opens="delete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>

        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" disabled={isDeletingBooking} onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
