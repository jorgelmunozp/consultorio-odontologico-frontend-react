import  { lazy, memo, useMemo } from 'react'
import { useDropdown } from './useDropdown.js';

const DropdownSelector = lazy(() => import('./DropdownSelector.js'));

export const Dropdown = ({ property, isOpen, onToggle }) => {
  const { array, pagination } = useDropdown({ classType:property.key });

  const placeholder = useMemo(() => property.key.charAt(0).toUpperCase() + property.key.slice(1), [property.key]);

  if( process.env.NODE_ENV === 'development' ) { console.log('[Dropdown]') }

  return (
    <div className='col px-0'>
      <DropdownSelector classType={property.key} value={property.value} array={array} handleChange={property.handleChange} placeholder={placeholder} pagination={pagination} isOpen={isOpen} onToggle={onToggle} className={"input form-control shadow-sm"} />
    </div>
  );
}

export default memo(Dropdown);