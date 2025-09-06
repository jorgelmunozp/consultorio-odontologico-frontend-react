import  { lazy } from 'react'
import { useDropdown } from './useDropdown.js';

const DropdownSelector = lazy(() => import('./DropdownSelector.js'));

export const Dropdown = ({ property, theme }) => {
  const { array, pagination } = useDropdown({ classType:property.key });

  return (
    <div className='col px-0'>
      <DropdownSelector classType={property.key} value={property.value} array={array} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} theme={theme} />
    </div>
  );
}

export default Dropdown;