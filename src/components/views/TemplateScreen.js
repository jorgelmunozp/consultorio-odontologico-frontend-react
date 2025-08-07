import '../../assets/styles/App.css';
import { Suspense, lazy } from 'react';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../global.js';
const MenuIcon = lazy(() => import('../icons/menu/Menu.js'));
const CalendarMedical = lazy(() => import('../icons/calendar/CalendarMedical.js'));
const UserInjured = lazy(() => import('../icons/user/UserInjured.js'));
const UserMedical = lazy(() => import('../icons/user/UserMedical.js'));
const Stethoscope = lazy(() => import('../icons/medical/Stethoscope.js'));
const StethoscopeLight = lazy(() => import('../icons/medical/StethoscopeLight.js'));
const Syringe = lazy(() => import('../icons/medical/Syringe.js'));
const SyringeLight = lazy(() => import('../icons/medical/SyringeLight.js'));
const HomeMedical = lazy(() => import('../icons/home/HomeMedical.js'));
const HomeIndex = lazy(() => import('../icons/home/HomeIndex.js'));
const HomeSearch = lazy(() => import('../icons/home/HomeSearch.js'));
const HomePlus = lazy(() => import('../icons/home/HomePlus.js'));
const CalendarSmile = lazy(() => import('../icons/calendar/CalendarSmile.js'));
const CalendarSearch = lazy(() => import('../icons/calendar/CalendarSearch.js'));
const CalendarPlus = lazy(() => import('../icons/calendar/CalendarPlus.js'));
const User = lazy(() => import('../icons/user/User.js'));
const UserSearch = lazy(() => import('../icons/user/UserSearch.js'));
const UserPlus = lazy(() => import('../icons/user/UserPlus.js'));
const HearthSearch = lazy(() => import('../icons/hearth/HearthSearch.js'));
const HearthPlus = lazy(() => import('../icons/hearth/HearthPlus.js'));
const FilterSearch = lazy(() => import('../icons/filter/FilterSearch.js'));
const FilterPlus = lazy(() => import('../icons/filter/FilterPlus.js'));
const IndexScreen = lazy(() => import('./index/IndexScreen.js'));
const IndexItems = lazy(() => import('../crud/views/IndexItems.js'));
const QueryItems = lazy(() => import('../crud/views/QueryItems.js'));
const CreateItems = lazy(() => import('../crud/views/CreateItems.js'));

export const TemplateScreen = ({ Logo, isMenuOpen, menu, setMenu, theme }) => {
  const menuIcons = {
    'cita':CalendarSmile, 'citaSearch':CalendarSearch, 'citaPlus':CalendarPlus,
    'paciente':User, 'pacienteSearch':UserSearch, 'pacientePlus':UserPlus,
    'doctor':User, 'doctorSearch':UserSearch, 'doctorPlus':UserPlus,
    'consultorio':HomeIndex, 'consultorioSearch':HomeSearch, 'consultorioPlus':HomePlus,
    'especialidad':StethoscopeLight, 'especialidadSearch':HearthSearch, 'especialidadPlus':HearthPlus,
    'tratamiento':SyringeLight, 'tratamientoSearch':FilterSearch, 'tratamientoPlus':FilterPlus
  }

  return (
    <div className="App user-select-none">
      <aside className='float-start pt-5'>                {/** Menu lateral **/}
        <Menu menu={menu} setMenu={setMenu} theme={theme} />
      </aside>
      <div className='App-body d-flex'>
        <div id="App" className="App mx-auto w-100"> 
          <Suspense fallback={ <div className="loaderBalls"><div className="loading"><div className="balls shadow"></div><div className="balls shadow"></div><div className="balls shadow"></div><span className="loadingTitle">Cargando...</span></div></div> }>
            <View Logo={Logo} menuIcons={menuIcons} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const Menu = ({ menu, setMenu, theme }) => {
  let iconColorHover = theme === 'dark' ? 'white-color-hover' : 'dark-color-hover';

  return(
    <nav className="navbar">
      <div className="offcanvas offcanvas-start bg-transparent" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
        <div className="offcanvas-header justify-content-center align-self-center align-items-center mx-auto w-100 shadow-sm">
          <h5 className="offcanvas-title nav-item">
            <button type="button" className="btn-menu bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close"><MenuIcon height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth + 0.5} className={'main-color'} /></button>
          </h5>
        </div>
        <div className="offcanvas-body mt-2">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(1)}><HomeIndex height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 1 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(2)}><CalendarMedical height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 2 ? ' main-color':' gray-color')  } /></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(3)}><CalendarSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 3 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(4)}><CalendarPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 4 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(5)}><UserInjured height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 5 ? ' main-color':' gray-color')  } /></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(6)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 6 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(7)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 7 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(8)}><Syringe height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 8 ? ' main-color':' gray-color')  } /> </button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(9)}><FilterSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 9 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(10)}><FilterPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 10 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(11)}><UserMedical height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 11 ? ' main-color':' gray-color')  } /></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(12)}><UserSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 12 ? ' main-color':' gray-color') }/> </button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(13)}><UserPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 13 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(14)}><Stethoscope height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 14 ? ' main-color':' gray-color')  } /></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(15)}><HearthSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 15 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(16)}><HearthPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 16 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(17)}><HomeMedical height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 17 ? ' main-color':' gray-color')  } /></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(18)}><HomeSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 18 ? ' main-color':' gray-color') }/></button></li>
            <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(19)}><HomePlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 19 ? ' main-color':' gray-color') }/></button></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

const View = ({ Logo, menuIcons, menu, setMenu, isMenuOpen, theme }) => {                            // Componente para elegir vista a renderizar 
  switch ( menu ) {
    case 1: return <IndexScreen Logo={Logo} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 2: return <IndexItems classType={'cita'} Icon={CalendarSmile} IconSearch={CalendarSearch} IconPlus={CalendarPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 3: return <QueryItems classType={'cita'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 4: return <CreateItems classType={'cita'} Icon={CalendarMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    case 5: return <IndexItems classType={'paciente'} Icon={User} IconSearch={UserSearch} IconPlus={UserPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 6: return <QueryItems classType={'paciente'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 7: return <CreateItems classType={'paciente'} Icon={UserInjured} isMenuOpen={isMenuOpen} theme={theme} />;
    case 8: return <IndexItems classType={'tratamiento'} Icon={SyringeLight} IconSearch={FilterSearch} IconPlus={FilterPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 9: return <QueryItems classType={'tratamiento'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 10: return <CreateItems classType={'tratamiento'} Icon={Stethoscope} isMenuOpen={isMenuOpen} theme={theme} />;
    case 11: return <IndexItems classType={'doctor'} Icon={User} IconSearch={UserSearch} IconPlus={UserPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 12: return <QueryItems classType={'doctor'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 13: return <CreateItems classType={'doctor'} Icon={UserMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    case 14: return <IndexItems classType={'especialidad'} Icon={StethoscopeLight} IconSearch={HearthSearch} IconPlus={HearthPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 15: return <QueryItems classType={'especialidad'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 16: return <CreateItems classType={'especialidad'} Icon={Stethoscope} isMenuOpen={isMenuOpen} theme={theme} />;
    case 17: return <IndexItems classType={'consultorio'} Icon={HomeIndex} IconSearch={HomeSearch} IconPlus={HomePlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} theme={theme} />;
    case 18: return <QueryItems classType={'consultorio'} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
    case 19: return <CreateItems classType={'consultorio'} Icon={HomeMedical} isMenuOpen={isMenuOpen} theme={theme} />;
    default: return <IndexScreen Logo={Logo} menuIcons={menuIcons} isMenuOpen={isMenuOpen} theme={theme} />;
  }
}