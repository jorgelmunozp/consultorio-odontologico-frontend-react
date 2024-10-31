import { useState } from 'react';
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

const View = ({ view }) => {
  switch (view) {
    case 0: return <QueryCitas />;
    case 1: return <QueryPacientes />;
    case 2: return <QueryDoctores />;
    case 3: return <QueryEspecialidades />;
    case 4: return <QueryConsultorios />;
    case 5: return <QueryTratamientos />;
    default: return <QueryCitas />;
  }
}

export const IndexScreen = () => {
  let [view, setView] = useState(0);

  return (
    <div className="App">
        <div className="container-fluid bg-light px-0 pt-4 pt-sm-3">
          <div className='backgroundImage pt-3 pb-5'>
            <Logo color={myColor} height={5} width={5} strokeWidth={0.9} />
            <h2 className='main-color fw-semibold'>{ myTitle }</h2>
          </div>
          <div className="row">   
            {
              services.map((service,index) => {
                return (
                  <div key={ service.title + index } className="col-lg-2 col-sm-4 col-4 mb-1 mb-sm-2 text-center">
                    <div className="card border-0 rounded-xs pt-0 shadow">
                      <button onClick={() => setView(index)} className="border-0">
                        <div className="card-body">
                          <i className="main-color">{ service.icon }</i>
                          <h6 className="text-secondary d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2">{ service.title }</h6>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <View view={view} />
        </div>
    </div>
  )
}
