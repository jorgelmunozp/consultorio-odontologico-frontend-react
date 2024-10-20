import { useState } from 'react';
import { ConsultarCitas } from '../../crud/consultar/ConsultarCitas';
import { ConsultarTratamientos } from '../../crud/consultar/ConsultarTratamientos';
import { ConsultarPacientes } from '../../crud/consultar/ConsultarPacientes';
import { ConsultarDoctores } from '../../crud/consultar/ConsultarDoctores';
import { ConsultarConsultorios } from '../../crud/consultar/ConsultarConsultorios';
import { Logo } from '../../icons/logo/Logo';
import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus } from 'react-icons/fa';
import { TbDental } from "react-icons/tb";

const iconSize = 20;
const services = [
  { "title":"Citas", "icon":<FaCalendarPlus size={iconSize}/> },
  { "title":"Tratamientos", "icon":<FaStethoscope size={iconSize}/> },    
  { "title":"Pacientes", "icon":<FaUserInjured size={iconSize}/> },
  { "title":"Médicos", "icon":<FaUserMd size={iconSize}/> },  
  { "title":"Consultorios", "icon":<FaClinicMedical size={iconSize}/> },
  { "title":"Contacto", "icon":<TbDental size={iconSize}/> }                
];

const View = ({ view,urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,pacientes,tratamientos,doctores,consultorios,epss,generos }) => {
  switch (view) {
    case 0: return <ConsultarCitas urlApi={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
    case 1: return <ConsultarTratamientos urlApi={urlApiTratamientos} doctores={doctores} consultorios={consultorios} />;
    case 2: return <ConsultarPacientes urlApi={urlApiPacientes} epss={epss} generos={generos} />;
    case 3: return <ConsultarDoctores urlApi={urlApiDoctores} tratamientos={tratamientos} generos={generos} />;
    case 4: return <ConsultarConsultorios urlApi={urlApiConsultorios} />;
    case 5: return <div className="App"><h5 className='main-color fs-sm-2 mt-4 mt-sm-5 mb-4'>Contacto</h5><Logo height={2.5} width={2.5} strokeWidth={1} className='main-color'/><h3 className='main-color'>El Consultorio</h3></div>;
    default: return <ConsultarCitas urlApi={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }
}

export const IndexScreen = ({ urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,pacientes,tratamientos,doctores,consultorios,epss,generos }) => {
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

          <View view={view} urlApiCitas={urlApiCitas} urlApiPacientes={urlApiPacientes} urlApiTratamientos={urlApiTratamientos} urlApiDoctores={urlApiDoctores} urlApiConsultorios={ urlApiConsultorios} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} epss={epss} generos={generos} />
        </div>
    </div>
  )
}
