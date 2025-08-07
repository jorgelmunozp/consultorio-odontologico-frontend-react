import { Suspense, lazy } from 'react';
const QueryItem = lazy(() => import('../QueryItem.js'));

export const QueryItems = ({ classType, menuIcons, isMenuOpen, theme }) => {
  return ( <Suspense fallback={<></>}><QueryItem classType={classType} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme}/></Suspense> )
}

export default QueryItems;