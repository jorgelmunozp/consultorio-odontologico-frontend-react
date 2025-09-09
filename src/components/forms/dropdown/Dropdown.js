import  { lazy, memo, useMemo } from 'react'
import { useDropdown } from './useDropdown.js';

const DropdownSelector = lazy(() => import('./DropdownSelector.js'));

export const Dropdown = ({ property, isOpen, onToggle }) => {
  const { array, pagination } = useDropdown({ classType:property.key });

  // 👇 Memoriza placeholder para evitar recalcularlo en cada render
  const placeholder = useMemo(() => property.key.charAt(0).toUpperCase() + property.key.slice(1), [property.key]);

  if( process.env.NODE_ENV === 'development' ) { console.log('[Dropdown]') }

  return (
    <div className='col px-0'>
      <DropdownSelector classType={property.key} value={property.value} array={array} handleChange={property.handleChange} placeholder={placeholder} pagination={pagination} isOpen={isOpen} onToggle={onToggle} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} />
    </div>
  );
}

export default memo(Dropdown);

// // 👇 memo para evitar re-render si props no cambian
// export default memo(Dropdown, (prev, next) => {
//   return (
//     prev.isOpen === next.isOpen &&
//     prev.onToggle === next.onToggle &&
//     prev.property.key === next.property.key &&
//     prev.property.value === next.property.value &&
//     prev.property.handleChange === next.property.handleChange
//   );
// });

//************************************************* */
// import { lazy, memo, useMemo } from 'react';
// import { useDropdown } from './useDropdown.js';

// const DropdownSelector = lazy(() => import('./DropdownSelector.js'));

// export const Dropdown = ({ property, isOpen, onToggle }) => {
//   const { array, pagination } = useDropdown({ classType: property.key });

//   const placeholder = useMemo(
//     () => property.key.charAt(0).toUpperCase() + property.key.slice(1),
//     [property.key]
//   );

//   if (process.env.NODE_ENV === 'development') console.log('[Dropdown]');

//   return (
//     <div className='col px-0'>
//       <DropdownSelector
//         classType={property.key}
//         value={property.value}
//         handleChange={property.handleChange}
//         placeholder={placeholder}
//         pagination={pagination}
//         isOpen={isOpen}
//         onToggle={onToggle}
//         className={"input form-control rounded border-muted border-1 text-muted shadow-sm"}
//       />
//     </div>
//   );
// }

// export default memo(Dropdown);



//********************************************** */
// import { memo, useMemo } from 'react';
// import { useDropdown } from './useDropdown.js';
// import DropdownSelector from './DropdownSelector.js';

// export const Dropdown = ({ property, isOpen, onToggle }) => {
//   const { array, pagination } = useDropdown({ classType: property.key });

//   const placeholder = useMemo(
//     () => property.key.charAt(0).toUpperCase() + property.key.slice(1),
//     [property.key]
//   );

//   return (
//     <DropdownSelector
//       classType={property.key}
//       value={property.value}
//       handleChange={property.handleChange}
//       placeholder={placeholder}
//       pagination={pagination}
//       isOpen={isOpen}
//       onToggle={onToggle}
//       className="form-control"
//     />
//   );
// };

// export default memo(Dropdown);

