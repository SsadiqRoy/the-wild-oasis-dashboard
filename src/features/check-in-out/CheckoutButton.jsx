import Button from '../../ui/Button';
import { useCheckOutBooking } from '../bookings/bookingHooks';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckOutBooking();

  return (
    <Button variation="danger" size="small" disabled={isCheckingOut} onClick={() => checkout({ id: bookingId, data: { status: 'checked-out' } })}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
