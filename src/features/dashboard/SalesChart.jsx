import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../context/DarkModeContext';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings = [], numDays }) {
  const { darkMode } = useDarkMode();

  const days = eachDayOfInterval({ start: subDays(new Date(), numDays - 1), end: new Date() });
  const data = days.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings.filter((b) => isSameDay(b.created_at, date)).reduce((a, b) => a + b.totalPrice, 0),
      extrasSales: bookings.filter((b) => isSameDay(b.created_at, date)).reduce((a, b) => a + b.extrasPrice, 0),
    };
  });

  const colors = darkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales ({format(days[0], 'MMM dd')} &mdash; {format(days.at(-1), 'MMM dd')})
      </Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: `${colors.text}` }} />
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: `${colors.text}` }} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <CartesianGrid strokeDasharray="4" />

          <Area dataKey="totalSales" {...colors.totalSales} name="Total Sales" unit="$" />
          <Area dataKey="extrasSales" {...colors.extrasSales} name="Extras Sales" unit="$" />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
