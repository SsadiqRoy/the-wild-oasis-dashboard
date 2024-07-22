import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from './dashboardHooks';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useCabins } from '../cabins/cabinHooks';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodaysActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, numDays, isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoadingStays } = useRecentStays();
  const { cabins, isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  const cabinCount = cabins.length;

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabinCount} />
      <TodaysActivity />
      <DurationChart stays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
