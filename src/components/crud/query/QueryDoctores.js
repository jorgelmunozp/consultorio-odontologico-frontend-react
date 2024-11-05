import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryDoctores = ({ isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItems classType={'doctor'} isMenuOpen={isMenuOpen} /> 
            </Suspense>
  )
}

export default QueryDoctores;