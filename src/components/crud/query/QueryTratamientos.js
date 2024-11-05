import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryTratamientos = ({ isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItems classType={'tratamiento'} isMenuOpen={isMenuOpen} /> 
            </Suspense>
  )
}