import { Suspense, lazy } from 'react';
const QueryItem = lazy(() => import('../QueryItem.js'));

export const QueryItems = ({ classType, isMenuOpen, theme }) => {
  return ( <Suspense fallback={<></>}><QueryItem classType={classType} isMenuOpen={isMenuOpen} theme={theme}/></Suspense>
  )
}

export default QueryItems;