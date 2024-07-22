import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking, useUpdateBooking } from '../bookings/bookingHooks';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import { useGetSetting } from '../settings/settingHooks';
import Empty from '../../ui/Empty';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [check, setCheck] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { update, isUpdating } = useUpdateBooking();
  const { setting, islSetting } = useGetSetting();
  const { booking, isGettingBooking } = useGetBooking();
  const moveBack = useMoveBack();

  useEffect(() => setCheck(booking?.isPaid), [booking?.isPaid]);

  if (isGettingBooking || islSetting) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const {
    id: bookingId,
    Guests: { fullName },
    totalPrice,
    status,
    hasBreakfast,
    numGuests,
    numNights,
  } = booking;

  const canCheckIn = status !== 'unconfirmed';
  const breakfastCost = numGuests * numNights * setting.breakfastPrice;
  const newPrice = formatCurrency(totalPrice + breakfastCost);
  const newPrices = ` (${formatCurrency(totalPrice)} + ${formatCurrency(breakfastCost)})`;

  function handleCheckin() {
    let obj = { status: 'checked-in', isPaid: true };
    if (addBreakfast)
      obj = { ...obj, hasBreakfast: true, extrasPrice: breakfastCost, totalPrice: totalPrice + breakfastCost };

    update({ id: bookingId, data: obj });
  }
  const handleAddBreakfast = () => {
    setAddBreakfast((a) => !a);
    setCheck(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox id="breakfast" checked={addBreakfast} onChange={handleAddBreakfast}>
            Would you like to include breakfast at <strong>{formatCurrency(breakfastCost)}</strong>
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox id={bookingId} checked={check} onChange={() => setCheck((c) => !c)} disabled={check}>
          I confirm that <strong>{fullName}</strong> has paid the total amount
          <strong>{!addBreakfast ? formatCurrency(totalPrice) : newPrice}</strong> {addBreakfast && newPrices}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!check || isUpdating || canCheckIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack} disabled={isUpdating}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
