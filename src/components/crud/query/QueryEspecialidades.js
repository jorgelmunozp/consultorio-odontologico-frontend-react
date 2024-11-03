// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryEspecialidades = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={<center><div className="loader"></div></center>}>
            <QueryItems classType={'especialidad'} isMenuOpen={isMenuOpen} /> 
          </Suspense>
  )
}
