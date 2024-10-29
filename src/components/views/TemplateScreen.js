
import { useState } from 'react';
import { IndexScreen } from './index/IndexScreen';
import { QueryItems } from '../crud/QueryItems';
import { QueryCitas } from '../crud/query/QueryCitas';
import { QueryPacientes } from '../crud/query/QueryPacientes';
import { QueryDoctores } from '../crud/query/QueryDoctores';
import { QueryConsultorios } from '../crud/query/QueryConsultorios';
import { QueryTratamientos } from '../crud/query/QueryTratamientos';
import { CreateCita } from '../crud/create/CreateCita';
import { CreatePaciente } from '../crud/create/CreatePaciente';
import { CreateDoctor } from '../crud/create/CreateDoctor';
import { CreateConsultorio } from '../crud/create/CreateConsultorio';
import { CreateTratamiento } from '../crud/create/CreateTratamiento';
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

  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>              {/** Menu lateral **/}
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
      <div className='App-body d-flex bg-white'>
        <div id='contenidoBody' className='contenidoBody mx-auto'>
          <div id="App" className="App"> 
              <Menu menu={ menu } />
          </div>
        </div>
      </div>
    </div>
  );
}

const Menu = ({ menu }) => {                            // Componente para elegir vista a renderizar
  switch ( menu ) {
    case 1: return <IndexScreen />;
    case 2: return <QueryCitas />;
    case 3: return <CreateCita Icon={FaCalendarPlus} />;
    case 4: return <QueryPacientes />;
    case 5: return <CreatePaciente Icon={FaUserInjured} />;
    case 6: return <QueryTratamientos />;
    case 7: return <CreateTratamiento Icon={FaStethoscope} />;
    case 8: return <QueryDoctores />;
    case 9: return <CreateDoctor Icon={FaUserMd} />;
    case 10: return <QueryConsultorios />;
    case 11: return <CreateConsultorio Icon={FaClinicMedical} />;
    default: return <IndexScreen />;
  }
}