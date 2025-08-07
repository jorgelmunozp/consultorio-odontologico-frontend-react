import { Suspense, lazy } from 'react';
const QueryItem = lazy(() => import('../QueryItem.js'));

export const QueryItems = ({ classType, isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItem classType={classType} isMenuOpen={isMenuOpen} /> 
            </Suspense>
  )
}

export default QueryItems;