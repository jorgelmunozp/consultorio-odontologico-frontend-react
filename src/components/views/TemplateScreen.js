import { IndexScreen } from './index/IndexScreen';
import { QueryCitas } from '../crud/query/QueryCitas';
import { QueryPacientes } from '../crud/query/QueryPacientes';
import { QueryDoctores } from '../crud/query/QueryDoctores';
import { QueryEspecialidades } from '../crud/query/QueryEspecialidades';
import { QueryConsultorios } from '../crud/query/QueryConsultorios';
import { QueryTratamientos } from '../crud/query/QueryTratamientos';
import { CreateCita } from '../crud/create/CreateCita';
import { CreatePaciente } from '../crud/create/CreatePaciente';
import { CreateDoctor } from '../crud/create/CreateDoctor';
import { CreateEspecialidad } from '../crud/create/CreateEspecialidad';
import { CreateConsultorio } from '../crud/create/CreateConsultorio';
import { CreateTratamiento } from '../crud/create/CreateTratamiento';
import { Menu } from '../icons/menu/Menu';
import { CalendarMedical } from '../icons/calendar/CalendarMedical';
import { UserInjured } from '../icons/user/UserInjured';
import { UserMedical } from '../icons/user/UserMedical';
import { Stethoscope } from '../icons/medical/Stethoscope';
import { Syringe } from '../icons/medical/Syringe';
import { HomeMedical } from '../icons/home/HomeMedical';
import { HomeIndex } from '../icons/home/HomeIndex';
import { HomePlus } from '../icons/home/HomePlus';
import { HomeSearch } from '../icons/home/HomeSearch';
import { CalendarSearch } from '../icons/calendar/CalendarSearch';
import { CalendarPlus } from '../icons/calendar/CalendarPlus';
import { UserSearch } from '../icons/user/UserSearch';
import { UserPlus } from '../icons/user/UserPlus';
import { HearthSearch } from '../icons/hearth/HearthSearch';
import { HearthPlus } from '../icons/hearth/HearthPlus';
import { FilterSearch } from '../icons/filter/FilterSearch';
import { FilterPlus } from '../icons/filter/FilterPlus';
import 'bootstrap/dist/css/bootstrap.css';
import '../../assets/styles/App.css';
import { iconHeight,iconWidth,iconStrokeWidth } from '../../global';

export const TemplateScreen = ({ menu, setMenu }) => {
  // const menuOpcion = 1;
  // const [menu, setMenu] = useState(menuOpcion);

  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>                {/** Menu lateral **/}
        <nav className="navbar bg-light">
          <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
            <div className="offcanvas-header justify-content-center align-self-center align-items-center mx-auto w-100 shadow-sm">
              <h5 className="offcanvas-title nav-item">
                <button type="button" className="btn-menu bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close"><Menu height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth + 0.5} className={'main-color'} /></button>
              </h5>
            </div>
            <div className="offcanvas-body mt-2">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(1)}><HomeIndex height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><CalendarMedical height={iconHeight} width={iconWidth} className='main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(2)}><CalendarSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(3)}><CalendarPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><UserInjured height={iconHeight} width={iconWidth} className='main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(4)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(5)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><Syringe height={iconHeight} width={iconWidth} className='main-color'/> </span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(6)}><FilterSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(7)}><FilterPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><UserMedical height={iconHeight} width={iconWidth} className='main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(8)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/> </button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(9)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><Stethoscope height={iconHeight} width={iconWidth} className='main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(10)}><HearthSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(11)}><HearthPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><span className="nav-link"><HomeMedical height={iconHeight} width={iconWidth} className='main-color'/></span></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(12)}><HomeSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(13)}><HomePlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className='text-muted main-color-hover'/></button></li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <div className='App-body d-flex bg-white'>
        <div id='contenidoBody' className='contenidoBody mx-auto'>
          <div id="App" className="App"> 
              <MenuView menu={ menu } />
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuView = ({ menu }) => {                            // Componente para elegir vista a renderizar
  switch ( menu ) {
    case 1: return <IndexScreen />;
    case 2: return <QueryCitas />;
    case 3: return <CreateCita Icon={CalendarMedical} />;
    case 4: return <QueryPacientes />;
    case 5: return <CreatePaciente Icon={UserInjured} />;
    case 6: return <QueryTratamientos />;
    case 7: return <CreateTratamiento Icon={Stethoscope} />;
    case 8: return <QueryDoctores />;
    case 9: return <CreateDoctor Icon={UserMedical} />;
    case 10: return <QueryEspecialidades />;
    case 11: return <CreateEspecialidad Icon={Stethoscope} />;
    case 12: return <QueryConsultorios />;
    case 13: return <CreateConsultorio Icon={HomeMedical} />;
    default: return <IndexScreen />;
  }
}