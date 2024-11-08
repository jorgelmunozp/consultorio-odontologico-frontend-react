import { useState, lazy } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { QueryCitas } from '../../crud/query/QueryCitas';
import { CalendarMedical } from '../../icons/calendar/CalendarMedical';
import { UserInjured } from '../../icons/user/UserInjured';
import { UserMedical } from '../../icons/user/UserMedical';
import { Stethoscope } from '../../icons/medical/Stethoscope';
import { HomeMedical } from '../../icons/home/HomeMedical';
import { Syringe } from '../../icons/medical/Syringe';
import { Logo } from '../../icons/logo/Logo';
import { myColor, myTitle, iconHeight, iconWidth } from  '../../../global';

const QueryPacientes = lazy(() => import('../../crud/query/QueryPacientes'));
const QueryDoctores = lazy(() => import('../../crud/query/QueryDoctores'));
const QueryEspecialidades = lazy(() => import('../../crud/query/QueryEspecialidades'));
const QueryConsultorios = lazy(() => import('../../crud/query/QueryConsultorios'));
const QueryTratamientos = lazy(() => import('../../crud/query/QueryTratamientos'));

const services = [
  { "title":"Citas", "icon":<CalendarMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Pacientes", "icon":<UserInjured height={iconHeight} width={iconWidth} /> },
  { "title":"Doctores", "icon":<UserMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Especialidades", "icon":<Stethoscope height={iconHeight} width={iconWidth} /> },
  { "title":"Consultorios", "icon":<HomeMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Tratamientos", "icon":<Syringe height={iconHeight} width={iconWidth} /> }
];

export const IndexScreen = ({ isMenuOpen }) => {
  let [view, setView] = useState(0);

  return (
    <div className="App">
        <div className={"container-fluid px-0 pt-2 me-0 smooth" + (isMenuOpen ? ' w-responsive':' w-100')}>
          <div id='headerIndex' className='backgroundImage pt-5 pb-5 z-0 smooth shadow' data-bs-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu">
            <Logo color={myColor} height={7} width={7} strokeWidth={0.9} className={'jumpHover'} />
            <h1 className='main-color fw-semibold jumpHover'>{ myTitle }</h1>
          </div>
          <div id="collapseMenu" className="row bg-transparent collapse shadow">   
            {
              services.map((service,index) => {
                return (
                  <div key={ service.title + index } className={"col-2 nav-item nav-link text-center"}>
                    <div className={"card border-0 rounded-0 pt-0 hover"}>
                      <button onClick={() => setView(index)} className="bg-transparent border-0">
                        <div className={"card-body bg-transparent jumpHover" + (view === index ? ' bounce':'')}>
                          <i className={(view === index ? ' main-color':' gray-color')}>{ service.icon }</i>
                          <h6 className={"d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2" + (view === index ? ' main-color':' gray-color')}>{ service.title }</h6>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <SwipeableViews index={view} onChangeIndex={(indexLatest)=>setView(indexLatest)} enableMouseEvents>
            <QueryCitas />
            <QueryPacientes />
            <QueryDoctores />
            <QueryEspecialidades />
            <QueryConsultorios />
            <QueryTratamientos />
          </SwipeableViews>
        </div>
    </div>
  )
}

export default IndexScreen;