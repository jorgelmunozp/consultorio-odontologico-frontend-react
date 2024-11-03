// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryPacientes = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={<center><div className="loader"></div></center>}>
            <QueryItems classType={'paciente'} isMenuOpen={isMenuOpen} />
          </Suspense>
  )
}
