import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { QueryCitas } from '../../crud/query/QueryCitas';
import { QueryPacientes } from '../../crud/query/QueryPacientes';
import { QueryDoctores } from '../../crud/query/QueryDoctores';
import { QueryEspecialidades } from '../../crud/query/QueryEspecialidades';
import { QueryConsultorios } from '../../crud/query/QueryConsultorios';
import { QueryTratamientos } from '../../crud/query/QueryTratamientos';
import { CalendarMedical } from '../../icons/calendar/CalendarMedical';
import { UserInjured } from '../../icons/user/UserInjured';
import { UserMedical } from '../../icons/user/UserMedical';
import { Stethoscope } from '../../icons/medical/Stethoscope';
import { HomeMedical } from '../../icons/home/HomeMedical';
import { Syringe } from '../../icons/medical/Syringe';
import { Logo } from '../../icons/logo/Logo';
import { myColor, myTitle, iconHeight, iconWidth } from  '../../../global';


const iconSize = 20;
const services = [
  { "title":"Citas", "icon":<CalendarMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Pacientes", "icon":<UserInjured height={iconHeight} width={iconWidth} /> },
  { "title":"Doctores", "icon":<UserMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Especialidades", "icon":<Stethoscope height={iconHeight} width={iconWidth} /> },
  { "title":"Consultorios", "icon":<HomeMedical height={iconHeight} width={iconWidth} /> },
  { "title":"Tratamientos", "icon":<Syringe height={iconHeight} width={iconWidth} /> }
];

// const View = ({ view }) => {
//   switch (view) {
//     case 0: return <QueryCitas />;
//     case 1: return <QueryPacientes />;
//     case 2: return <QueryDoctores />;
//     case 3: return <QueryEspecialidades />;
//     case 4: return <QueryConsultorios />;
//     case 5: return <QueryTratamientos />;
//     default: return <QueryCitas />;
//   }
// }

export const IndexScreen = () => {
  let [view, setView] = useState(0);

  return (
    <div className="App">
        <div className="container-fluid px-0 pt-2">
          <div className='backgroundImage pt-5 pb-5 shadow' data-bs-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu">
            <Logo color={myColor} height={7} width={7} strokeWidth={0.9} />
            <h1 className='main-color fw-semibold'>{ myTitle }</h1>
          </div>
          <div id="collapseMenu" className="row collapse">   
            {
              services.map((service,index) => {
                return (
                  <div key={ service.title + index } className={"col-lg-2 col-sm-4 col-4 nav-item nav-link mb-1 mb-sm-2 text-center"}>
                    <div className={"card border-0 rounded-xs pt-0 hover shadow" + (view === index ? ' bounce active':'')}>
                      <button onClick={() => setView(index)} className="bg-transparent border-0">
                        <div className="card-body">
                          <i className={(view === index ? ' gray-color':' main-color')}>{ service.icon }</i>
                          <h6 className={"d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2" + (view === index ? ' gray-color':' text-secondary')}>{ service.title }</h6>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          {/* <View view={view} /> */}
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
