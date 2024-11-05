import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryConsultorios = ({ isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItems classType={'consultorio'} isMenuOpen={isMenuOpen} /> 
            </Suspense>
  )
}
