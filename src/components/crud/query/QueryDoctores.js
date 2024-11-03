// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryDoctores = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={<center><div className="loader"></div></center>}>
            <QueryItems classType={'doctor'} isMenuOpen={isMenuOpen} /> 
          </Suspense>
  )
}
