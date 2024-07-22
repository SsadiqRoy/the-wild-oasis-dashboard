import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinOperations() {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No Discount' },
    { value: 'with-discount', label: 'With Discount' },
  ];
  const sorters = [
    { value: 'name-asc', label: 'Sort by name (A-Z)' },
    { value: 'name-desc', label: 'Sort by name (Z-A)' },
    { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
    { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
    { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
    { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
  ];
  return (
    <TableOperations>
      <Filter options={filters} name="discount" />
      <SortBy options={sorters} name="sortBy" />
    </TableOperations>
  );
}

export default CabinOperations;
