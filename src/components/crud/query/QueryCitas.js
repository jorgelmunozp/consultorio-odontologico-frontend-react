// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryCitas = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={
          // <center><div className="loader"></div></center>

          <center><div class="clock-loader"></div></center>
          
          // <center>
          //   <div class="loader">
          //     <div class="inner one"></div>
          //     <div class="inner two"></div>
          //     <div class="inner three"></div>
          //   </div>
          // </center>


          // <div class="container">
          //   <div class="cargando">
          //     <div class="pelotas"></div>
          //     <div class="pelotas"></div>
          //     <div class="pelotas"></div>
          //     <span class="texto-cargando">Cargando...</span>
          //   </div>
          // </div>

          }>
            <QueryItems classType={'cita'} isMenuOpen={isMenuOpen} /> 
          </Suspense>
  )
}
