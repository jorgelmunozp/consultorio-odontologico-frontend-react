import { useState } from 'react';
import { QueryCitas } from '../../crud/query/QueryCitas';
import { QueryPacientes } from '../../crud/query/QueryPacientes';
import { QueryDoctores } from '../../crud/query/QueryDoctores';
import { QueryEspecialidades } from '../../crud/query/QueryEspecialidades';
import { QueryConsultorios } from '../../crud/query/QueryConsultorios';
import { QueryTratamientos } from '../../crud/query/QueryTratamientos';
import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus } from 'react-icons/fa';

const iconSize = 20;
const services = [
  { "title":"Citas", "icon":<FaCalendarPlus size={iconSize}/> },
  { "title":"Pacientes", "icon":<FaUserInjured size={iconSize}/> },
  { "title":"Doctores", "icon":<FaUserMd size={iconSize}/> },
  { "title":"Especialidades", "icon":<FaStethoscope size={iconSize}/> },
  { "title":"Consultorios", "icon":<FaClinicMedical size={iconSize}/> },
  { "title":"Tratamientos", "icon":<FaStethoscope size={iconSize}/> }
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
        <div className="container-fluid bg-light px-0  pt-4 pt-sm-5">
          <div className="row">   
            {
              services.map((service,index) => {
                return (
                  <div key={ service.title + index } className="col-lg-4 col-sm-6 col-6 mb-1 mb-sm-2 text-center">
                    <div className="card border-0 shadow rounded-xs pt-0">
                      <button onClick={()=>setView(index)} className="border-0">
                        <div className="card-body">
                          <i className="main-color">{ service.icon }</i>
                          <h6 className="text-secondary fs-sm-1 mt-0 mb-0 mb-sm-2 text-nowrap text-truncate">{ service.title }</h6>
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
