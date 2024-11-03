// import { QueryItems } from '../QueryItems';
import { Suspense, lazy } from 'react';
const QueryItems = lazy(() => import('../QueryItems'));

export const QueryCitas = ({ isMenuOpen }) => {
  return ( 
          <Suspense fallback={
          // <center><div className="loader"></div></center>

          <center><div className="clock-loader"></div></center>
          
          // <center>
          //   <div className="loader">
          //     <div className="inner one"></div>
          //     <div className="inner two"></div>
          //     <div className="inner three"></div>
          //   </div>
          // </center>


          // <div className="container">
          //   <div className="cargando">
          //     <div className="pelotas"></div>
          //     <div className="pelotas"></div>
          //     <div className="pelotas"></div>
          //     <span className="texto-cargando">Cargando...</span>
          //   </div>
          // </div>

          }>
            <QueryItems classType={'cita'} isMenuOpen={isMenuOpen} /> 
          </Suspense>
  )
}
