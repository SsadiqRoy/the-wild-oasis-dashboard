import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options, name }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set(name, e.target.value);
    setSearchParams(searchParams);
  }

  const value = searchParams.get(name) || '';
  return <Select options={options} value={value} onchange={handleChange} />;
}

export default SortBy;
