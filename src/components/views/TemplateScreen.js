import '../../assets/styles/App.css';
// import { IndexScreen } from './index/IndexScreen';
// import { IndexCitas } from '../crud/index/IndexCitas';
// import { IndexPacientes } from '../crud/index/IndexPacientes';
// import { IndexDoctores } from '../crud/index/IndexDoctores';
// import { IndexEspecialidades } from '../crud/index/IndexEspecialidades';
// import { IndexConsultorios } from '../crud/index/IndexConsultorios';
// import { IndexTratamientos } from '../crud/index/IndexTratamientos';
// import { QueryCitas } from '../crud/query/QueryCitas';
// import { QueryPacientes } from '../crud/query/QueryPacientes';
// import { QueryDoctores } from '../crud/query/QueryDoctores';
// import { QueryEspecialidades } from '../crud/query/QueryEspecialidades';
// import { QueryConsultorios } from '../crud/query/QueryConsultorios';
// import { QueryTratamientos } from '../crud/query/QueryTratamientos';
// import { CreateCita } from '../crud/create/CreateCita';
// import { CreatePaciente } from '../crud/create/CreatePaciente';
// import { CreateDoctor } from '../crud/create/CreateDoctor';
// import { CreateEspecialidad } from '../crud/create/CreateEspecialidad';
// import { CreateConsultorio } from '../crud/create/CreateConsultorio';
// import { CreateTratamiento } from '../crud/create/CreateTratamiento';
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
import { iconHeight,iconWidth,iconStrokeWidth } from '../../global';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';

import { Suspense, lazy } from 'react';
const IndexScreen = lazy(() => import('./index/IndexScreen'));
const IndexCitas = lazy(() => import('../crud/index/IndexCitas'));
const IndexPacientes = lazy(() => import('../crud/index/IndexPacientes'));
const IndexDoctores = lazy(() => import('../crud/index/IndexDoctores'));
const IndexEspecialidades = lazy(() => import('../crud/index/IndexEspecialidades'));
const IndexConsultorios = lazy(() => import('../crud/index/IndexConsultorios'));
const IndexTratamientos = lazy(() => import('../crud/index/IndexTratamientos'));
const QueryCitas = lazy(() => import('../crud/query/QueryCitas'));
const QueryPacientes = lazy(() => import('../crud/query/QueryPacientes'));
const QueryDoctores = lazy(() => import('../crud/query/QueryDoctores'));
const QueryEspecialidades = lazy(() => import('../crud/query/QueryEspecialidades'));
const QueryConsultorios = lazy(() => import('../crud/query/QueryConsultorios'));
const QueryTratamientos = lazy(() => import('../crud/query/QueryTratamientos'));
const CreateCita = lazy(() => import('../crud/create/CreateCita'));
const CreatePaciente = lazy(() => import('../crud/create/CreatePaciente'));
const CreateDoctor = lazy(() => import('../crud/create/CreateDoctor'));
const CreateEspecialidad = lazy(() => import('../crud/create/CreateEspecialidad'));
const CreateConsultorio = lazy(() => import('../crud/create/CreateConsultorio'));
const CreateTratamiento = lazy(() => import('../crud/create/CreateTratamiento'));

export const TemplateScreen = ({ isMenuOpen, menu, setMenu, }) => {
  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>                {/** Menu lateral **/}
        <nav className="navbar">
          <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
            <div className="offcanvas-header justify-content-center align-self-center align-items-center mx-auto w-100 shadow-sm">
              <h5 className="offcanvas-title nav-item">
                <button type="button" className="btn-menu bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close"><Menu height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth + 0.5} className={'main-color'} /></button>
              </h5>
            </div>
            <div className="offcanvas-body mt-2">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(1)}><HomeIndex height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 1 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(2)}><CalendarMedical height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 2 ? ' main-color':' gray-color')  } /></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(3)}><CalendarSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 3 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(4)}><CalendarPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 4 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(5)}><UserInjured height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 5 ? ' main-color':' gray-color')  } /></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(6)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 6 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(7)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 7 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(8)}><Syringe height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 8 ? ' main-color':' gray-color')  } /> </button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(9)}><FilterSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 9 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(10)}><FilterPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 10 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(11)}><UserMedical height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 11 ? ' main-color':' gray-color')  } /></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(12)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 12 ? ' main-color':' gray-color') }/> </button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(13)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 13 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(14)}><Stethoscope height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 14 ? ' main-color':' gray-color')  } /></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(15)}><HearthSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 15 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(16)}><HearthPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 16 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(17)}><HomeMedical height={iconHeight} width={iconWidth} className={'dark-color-hover jumpHover' + (menu === 17 ? ' main-color':' gray-color')  } /></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(18)}><HomeSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 18 ? ' main-color':' gray-color') }/></button></li>
                <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(19)}><HomePlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'dark-color-hover jumpHover' + (menu === 19 ? ' main-color':' gray-color') }/></button></li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <div className='App-body d-flex'>
        <div id="App" className="App mx-auto w-100"> 
          <Suspense fallback={ <div className="loaderBalls"><div className="loading"><div className="balls shadow"></div><div className="balls shadow"></div><div className="balls shadow"></div><span className="loadingTitle">Cargando...</span></div></div> }>
            <MenuView menu={ menu } isMenuOpen={ isMenuOpen } setMenu={ setMenu } />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const MenuView = ({ menu, isMenuOpen, setMenu }) => {                            // Componente para elegir vista a renderizar
  switch ( menu ) {
    case 1: return <IndexScreen isMenuOpen={isMenuOpen} />;
    case 2: return <IndexCitas isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 3: return <QueryCitas isMenuOpen={isMenuOpen} />;
    case 4: return <CreateCita Icon={CalendarMedical} isMenuOpen={isMenuOpen} />;
    case 5: return <IndexPacientes isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 6: return <QueryPacientes isMenuOpen={isMenuOpen} />;
    case 7: return <CreatePaciente Icon={UserInjured} isMenuOpen={isMenuOpen} />;
    case 8: return <IndexTratamientos isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 9: return <QueryTratamientos isMenuOpen={isMenuOpen} />;
    case 10: return <CreateTratamiento Icon={Stethoscope} isMenuOpen={isMenuOpen} />;
    case 11: return <IndexDoctores isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 12: return <QueryDoctores isMenuOpen={isMenuOpen} />;
    case 13: return <CreateDoctor Icon={UserMedical} isMenuOpen={isMenuOpen} />;
    case 14: return <IndexEspecialidades isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 15: return <QueryEspecialidades isMenuOpen={isMenuOpen} />;
    case 16: return <CreateEspecialidad Icon={Stethoscope} isMenuOpen={isMenuOpen} />;
    case 17: return <IndexConsultorios isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 18: return <QueryConsultorios isMenuOpen={isMenuOpen} />;
    case 19: return <CreateConsultorio Icon={HomeMedical} isMenuOpen={isMenuOpen} />;
    default: return <IndexScreen isMenuOpen={isMenuOpen} />;
  }
}