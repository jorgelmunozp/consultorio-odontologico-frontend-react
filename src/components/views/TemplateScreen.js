import '../../assets/styles/App.css';
import { Suspense, lazy } from 'react';
import { Menu as MenuIcon } from '../icons/menu/Menu';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../global.js';
// const Menu as MenuIcon = lazy(() => import('../icons/menu/Menu.js'));
const CalendarMedical = lazy(() => import('../icons/calendar/CalendarMedical.js'));
const UserInjured = lazy(() => import('../icons/user/UserInjured.js'));
const UserMedical = lazy(() => import('../icons/user/UserMedical.js'));
const Stethoscope = lazy(() => import('../icons/medical/Stethoscope.js'));
const Syringe = lazy(() => import('../icons/medical/Syringe.js'));
const HomeMedical = lazy(() => import('../icons/home/HomeMedical.js'));
const HomeIndex = lazy(() => import('../icons/home/HomeIndex.js'));
const HomeSearch = lazy(() => import('../icons/home/HomeSearch.js'));
const HomePlus = lazy(() => import('../icons/home/HomePlus.js'));
const CalendarSearch = lazy(() => import('../icons/calendar/CalendarSearch.js'));
const CalendarPlus = lazy(() => import('../icons/calendar/CalendarPlus.js'));
const UserSearch = lazy(() => import('../icons/user/UserSearch.js'));
const UserPlus = lazy(() => import('../icons/user/UserPlus.js'));
const HearthSearch = lazy(() => import('../icons/hearth/HearthSearch.js'));
const HearthPlus = lazy(() => import('../icons/hearth/HearthPlus.js'));
const FilterSearch = lazy(() => import('../icons/filter/FilterSearch.js'));
const FilterPlus = lazy(() => import('../icons/filter/FilterPlus.js'));

const IndexScreen = lazy(() => import('./index/IndexScreen.js'));
const IndexCitas = lazy(() => import('../crud/index/IndexCitas.js'));
const IndexPacientes = lazy(() => import('../crud/index/IndexPacientes.js'));
const IndexDoctores = lazy(() => import('../crud/index/IndexDoctores.js'));
const IndexEspecialidades = lazy(() => import('../crud/index/IndexEspecialidades.js'));
const IndexConsultorios = lazy(() => import('../crud/index/IndexConsultorios.js'));
const IndexTratamientos = lazy(() => import('../crud/index/IndexTratamientos.js'));

const QueryItems = lazy(() => import('../crud/views/QueryItems.js'));
const CreateItems = lazy(() => import('../crud/views/CreateItems.js'));

export const TemplateScreen = ({ Logo, isMenuOpen, menu, setMenu, theme }) => {
  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>                {/** Menu lateral **/}
        <Menu menu={menu} setMenu={setMenu} />
      </aside>
      <div className='App-body d-flex'>
        <div id="App" className="App mx-auto w-100"> 
          <Suspense fallback={ <div className="loaderBalls"><div className="loading"><div className="balls shadow"></div><div className="balls shadow"></div><div className="balls shadow"></div><span className="loadingTitle">Cargando...</span></div></div> }>
            <View Logo={Logo} menu={menu} isMenuOpen={isMenuOpen} setMenu={setMenu} theme={theme} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const Menu = ({ menu, setMenu }) => {
  return(
    <nav className="navbar">
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
        <div className="offcanvas-header justify-content-center align-self-center align-items-center mx-auto w-100 shadow-sm">
          <h5 className="offcanvas-title nav-item">
            <button type="button" className="btn-menu bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close"><MenuIcon height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth + 0.5} className={'main-color'} /></button>
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
  )
}

const View = ({ Logo, menu, isMenuOpen, setMenu, theme }) => {                            // Componente para elegir vista a renderizar
  switch ( menu ) {
    case 1: return <IndexScreen Logo={Logo} isMenuOpen={isMenuOpen} theme={theme} />;
    case 2: return <IndexCitas isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 3: return <QueryItems classType={'cita'} isMenuOpen={isMenuOpen} />;
    case 4: return <CreateItems classType={'cita'} Icon={CalendarMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    case 5: return <IndexPacientes isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 6: return <QueryItems classType={'paciente'} isMenuOpen={isMenuOpen} />;
    case 7: return <CreateItems classType={'paciente'} Icon={UserInjured} isMenuOpen={isMenuOpen} theme={theme} />;
    case 8: return <IndexTratamientos isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 9: return <QueryItems classType={'tratamiento'} isMenuOpen={isMenuOpen} />;
    case 10: return <CreateItems classType={'tratamiento'} Icon={Stethoscope} isMenuOpen={isMenuOpen} theme={theme} />;
    case 11: return <IndexDoctores isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 12: return <QueryItems classType={'doctor'} isMenuOpen={isMenuOpen} />;
    case 13: return <CreateItems classType={'doctor'} Icon={UserMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    case 14: return <IndexEspecialidades isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 15: return <QueryItems classType={'especialidad'} isMenuOpen={isMenuOpen} />;
    case 16: return <CreateItems classType={'especialidad'} Icon={Stethoscope} isMenuOpen={isMenuOpen} theme={theme} />;
    case 17: return <IndexConsultorios isMenuOpen={isMenuOpen} setMenu={setMenu} />;
    case 18: return <QueryItems classType={'consultorio'} isMenuOpen={isMenuOpen} />;
    case 19: return <CreateItems classType={'consultorio'} Icon={HomeMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    default: return <IndexScreen Logo={Logo} isMenuOpen={isMenuOpen} theme={theme} />;
  }
}