import CabinRow from './CabinRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import { useCabins } from './cabinHooks';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { cabins, isLoadingCabins: isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  // 1) FILTERING
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins = cabins;
  if (filterValue === 'with-discount') filteredCabins = cabins.filter((c) => c.discount > 0);
  if (filterValue === 'no-discount') filteredCabins = cabins.filter((c) => c.discount === 0);

  // 2) SORTING
  const sortValue = searchParams.get('sortBy') || '';
  if (sortValue) {
    const [field, direction] = sortValue.split('-');
    const modifier = direction === 'asc' ? 1 : -1;

    filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
  }

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Menus>
        <Table.Body data={filteredCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
      </Menus>
    </Table>
  );
}

export default CabinTable;
