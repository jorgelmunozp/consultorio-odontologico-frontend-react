
import React, { useState } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { IndexScreen } from './index/IndexScreen';
import { ConsultarCitas } from '../crud/consultar/ConsultarCitas';
import { ConsultarPacientes } from '../crud/consultar/ConsultarPacientes';
import { ConsultarTratamientos } from '../crud/consultar/ConsultarTratamientos';
import { ConsultarDoctores } from '../crud/consultar/ConsultarDoctores';
import { ConsultarConsultorios } from '../crud/consultar/ConsultarConsultorios';
import { CreateCita } from '../crud/create/CreateCita';
import { CreatePaciente } from '../crud/create/CreatePaciente';
import { CreateTratamiento } from '../crud/create/CreateTratamiento';
import { CreateDoctor } from '../crud/create/CreateDoctor';
import { CreateConsultorio } from '../crud/create/CreateConsultorio';
import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus } from 'react-icons/fa';
import { HomeIndex } from '../icons/home/HomeIndex';
import { HomePlus } from '../icons/home/HomePlus';
import { HomeSearch } from '../icons/home/HomeSearch';
import { CalendarSearch } from '../icons/calendar/CalendarSearch';
import { CalendarPlus } from '../icons/calendar/CalendarPlus';
import { UserSearch } from '../icons/user/UserSearch';
import { UserPlus } from '../icons/user/UserPlus';
import { FilterSearch } from '../icons/filter/FilterSearch';
import { FilterPlus } from '../icons/filter/FilterPlus';
import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/styles/App.css';

export const TemplateScreen = () => {
  const iconHeight = 1.25;
  const iconWidth = 1.25;
  const iconStrokeWidth = 1.5;
  const iconSize = 17.5;

  const menuOpcion = 1;
  const [menu, setMenu] = useState(menuOpcion);

  const urlApiCitas = process.env.REACT_APP_API_CITAS;

  const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
  const pacientes = useFetch(urlApiPacientes).data;

  const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
  const doctores = useFetch(urlApiDoctores).data;

  const urlApiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
  const consultorios = useFetch(urlApiConsultorios).data;

  const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
  const tratamientos = useFetch(urlApiTratamientos).data;

  const urlApiEpss = process.env.REACT_APP_API_EPSS;
  const epss = useFetch(urlApiEpss).data;

  const urlApiGeneros = process.env.REACT_APP_API_GENEROS;
  const generos  = useFetch(urlApiGeneros).data;

  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>    {/** Menu lateral */}
        <nav className="navbar bg-light">
          <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasBodyLabel">⌂</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(1)}><HomeIndex height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><FaCalendarPlus size={iconSize} className=' main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(2)}><CalendarSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(3)}><CalendarPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><FaUserInjured size={iconSize} className=' main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(4)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(5)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><FaStethoscope size={iconSize} className=' main-color'/> </span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(6)}><FilterSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(7)}><FilterPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><FaUserMd size={iconSize} className=' main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(8)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/> </button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(9)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><FaClinicMedical size={iconSize} className=' main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(10)}><HomeSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(11)}><HomePlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <body className='App-body d-flex bg-white'>
        <div id='contenidoBody' className='contenidoBody mx-auto'>
          <div id="App" className="App"> 
              <Menu menu={menu} urlApiCitas={urlApiCitas} urlApiPacientes={urlApiPacientes} urlApiTratamientos={urlApiTratamientos} urlApiDoctores={urlApiDoctores} urlApiConsultorios={ urlApiConsultorios} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} epss={epss} generos={generos} />
          </div>
        </div>
      </body>
    </div>
  );
}

const Menu = ({menu,urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,pacientes,tratamientos,doctores,consultorios,epss,generos}) => {        //Componente para elegir vista a renderizar
  switch (menu) {
    case 1: return <IndexScreen urlApiCitas={urlApiCitas} urlApiPacientes={urlApiPacientes} urlApiTratamientos={urlApiTratamientos} urlApiDoctores={urlApiDoctores} urlApiConsultorios={ urlApiConsultorios} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
    case 2: return <ConsultarCitas urlApi={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
    case 3: return <CreateCita urlApi={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
    case 4: return <ConsultarPacientes urlApi={urlApiPacientes} epss={epss} generos={generos} />;
    case 5: return <CreatePaciente urlApi={urlApiPacientes} epss={epss} generos={generos} />;
    case 6: return <ConsultarTratamientos urlApi={urlApiTratamientos} doctores={doctores} consultorios={consultorios} />;
    case 7: return <CreateTratamiento urlApi={urlApiTratamientos} doctores={doctores} consultorios={consultorios} />;
    case 8: return <ConsultarDoctores urlApi={urlApiDoctores} tratamientos={tratamientos} generos={generos} />;
    case 9: return <CreateDoctor urlApi={urlApiDoctores} tratamientos={tratamientos} generos={generos} />;
    case 10: return <ConsultarConsultorios urlApi={urlApiConsultorios} />;
    case 11: return <CreateConsultorio urlApi={urlApiConsultorios} consultorios={consultorios} />;
    default: return <IndexScreen urlApiCitas={urlApiCitas} urlApiPacientes={urlApiPacientes} urlApiTratamientos={urlApiTratamientos} urlApiDoctores={urlApiDoctores} urlApiConsultorios={ urlApiConsultorios} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }
}