import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate, getStaysAfterDate, getStaysTodayActivity } from '../../services/apiBookings';

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get('last') || 7;
  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({ queryFn: () => getBookingsAfterDate(date), queryKey: ['bookings', `last-${numDays}`] });

  return { bookings: data, numDays, isLoadingBookings: isLoading };
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = +searchParams.get('last') || 7;
  const date = subDays(new Date(), numDays).toISOString();

  const { data, isLoading } = useQuery({ queryFn: () => getStaysAfterDate(date), queryKey: ['stays', `last-${numDays}`] });
  const confirmedStays = data?.filter((s) => s.status === 'checked-in' || s.status === 'checked-out') || [];

  return { stays: data, confirmedStays, isLoadingStays: isLoading };
}

export function useTodayActivity() {
  const { data, isLoading } = useQuery({ queryFn: getStaysTodayActivity, queryKey: ['todays-activity'] });

  return { activities: data, isLoadingActivities: isLoading };
}
