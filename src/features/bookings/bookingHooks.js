import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBooking, getBooking, getBookings, updateBooking } from '../../services/apiBookings';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';
import toast from 'react-hot-toast';

//
export function useGetBookings(filterField) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  let page = +searchParams.get('page') || 1;

  const filterValue = searchParams.get(filterField);
  let filter = !filterValue || filterValue === 'all' ? null : { field: filterField, value: filterValue };
  // if (filter) page = 1;

  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const [sortField, sortDirection] = sortValue.split('-');
  const sortBy = { field: sortField, direction: sortDirection };

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({ queryFn: () => getBookings({ filter, sortBy, page }), queryKey: ['bookings', filter, sortBy, page] });

  const canFetchNext = page < Math.ceil(count / PAGE_SIZE);
  const canFetchPrev = page !== 1;

  canFetchNext &&
    queryClient.prefetchQuery({ queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), queryKey: ['bookings', filter, sortBy, page + 1] });
  canFetchPrev &&
    queryClient.prefetchQuery({ queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), queryKey: ['bookings', filter, sortBy, page - 1] });

  return { bookings, count, isLoading, error };
}

export function useGetBooking() {
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({ queryFn: () => getBooking(bookingId), queryKey: ['booking', bookingId], retry: false });

  return { booking: data, isGettingBooking: isLoading, getBookingError: error };
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (data) => updateBooking(data.id, data.data),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast.error('Unable to check in this booking'),
  });

  return { update: mutate, isUpdating: isLoading, updatingError: error };
}

export function useCheckOutBooking() {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (data) => updateBooking(data.id, data.data),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error('Unable to check out this booking'),
  });

  return { checkout: mutate, isCheckingOut: isLoading, checkoutError: error };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} is deleted successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking: mutate, isDeletingBooking: isLoading, deletingError: error };
}
