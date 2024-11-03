// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryTratamientos = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={<center><div className="loader"></div></center>}>
            <QueryItems classType={'tratamiento'} isMenuOpen={isMenuOpen} /> 
          </Suspense>
  )
}
