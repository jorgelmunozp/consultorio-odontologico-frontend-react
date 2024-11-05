import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryEspecialidades = ({ isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItems classType={'especialidad'} isMenuOpen={isMenuOpen} /> 
            </Suspense>
  )
}
