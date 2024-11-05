import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryPacientes = ({ isMenuOpen }) => {
  return (  <Suspense fallback={<></>}>
              <QueryItems classType={'paciente'} isMenuOpen={isMenuOpen} />
            </Suspense>
  )
}

export default QueryPacientes;