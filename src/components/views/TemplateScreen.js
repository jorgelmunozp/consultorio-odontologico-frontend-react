import '../../assets/styles/App.css';
import { Suspense, memo, lazy, useState } from 'react';
import { useThemeContext } from "../../theme/ThemeContext.js";

const MenuSide = memo( lazy(() => import('../menu/MenuSide.js')) );

const Menu = memo( lazy(() => import('../icons/menu/Menu.js')) );
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

export const TemplateScreen = ({ isMenuOpen }) => {
  const [menu, setMenu] = useState(1);

  const { theme } = useThemeContext();        // 👈 Call the global theme

  const Icons = {
    'Menu':Menu, 'HomeMenu':HomeIndex,
    'Cita':CalendarSmile, 'CitaMenu':CalendarMedical, 'CitaSearch':CalendarSearch, 'CitaPlus':CalendarPlus,
    'Paciente':User, 'PacienteMenu':UserInjured, 'PacienteSearch':UserSearch, 'PacientePlus':UserPlus,
    'Doctor':User, 'DoctorMenu': UserMedical, 'DoctorSearch':UserSearch, 'DoctorPlus':UserPlus,
    'Consultorio':HomeIndex, 'ConsultorioMenu':HomeMedical,'ConsultorioSearch':HomeSearch, 'ConsultorioPlus':HomePlus,
    'Especialidad':StethoscopeLight, 'EspecialidadMenu':Stethoscope, 'EspecialidadSearch':HearthSearch, 'EspecialidadPlus':HearthPlus,
    'Tratamiento':SyringeLight, 'TratamientoMenu':Syringe, 'TratamientoSearch':FilterSearch, 'TratamientoPlus':FilterPlus
  }

  return (
    <div id="template" className="App user-select-none" data-theme={theme}>
      <aside className='float-start pt-5'>                {/** Menu lateral **/}
        <MenuSide Icons={Icons} menu={menu} setMenu={setMenu} />
      </aside>
      <div className='App-body d-flex'>
        <div id="App" className="App mx-auto w-100"> 
          <Suspense fallback={ <div className="loaderBalls"><div className="loading"><div className="balls shadow"></div><div className="balls shadow"></div><div className="balls shadow"></div><span className="loadingTitle">Cargando...</span></div></div> }>
            <View Icons={Icons} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const View = ({ Icons, menu, setMenu, isMenuOpen }) => {                            // Componente para elegir vista a renderizar 
  switch ( menu ) {
    case 1: return <IndexScreen Icons={Icons} isMenuOpen={isMenuOpen} />;
    case 2: return <IndexItems classType={'cita'} Icon={CalendarSmile} IconSearch={CalendarSearch} IconPlus={CalendarPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 3: return <QueryItems classType={'cita'} Icons={Icons} title={'Citas'} isMenuOpen={isMenuOpen} />;
    case 4: return <CreateItems classType={'cita'} Icon={CalendarMedical} isMenuOpen={isMenuOpen} />;
    case 5: return <IndexItems classType={'paciente'} Icon={User} IconSearch={UserSearch} IconPlus={UserPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 6: return <QueryItems classType={'paciente'} Icons={Icons} title={'Pacientes'} isMenuOpen={isMenuOpen} />;
    case 7: return <CreateItems classType={'paciente'} Icon={UserInjured} isMenuOpen={isMenuOpen} />;
    case 8: return <IndexItems classType={'tratamiento'} Icon={SyringeLight} IconSearch={FilterSearch} IconPlus={FilterPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 9: return <QueryItems classType={'tratamiento'} Icons={Icons} title={'Tratamientos'} isMenuOpen={isMenuOpen} />;
    case 10: return <CreateItems classType={'tratamiento'} Icon={Stethoscope} isMenuOpen={isMenuOpen} />;
    case 11: return <IndexItems classType={'doctor'} Icon={User} IconSearch={UserSearch} IconPlus={UserPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 12: return <QueryItems classType={'doctor'} Icons={Icons} title={'Doctores'} isMenuOpen={isMenuOpen} />;
    case 13: return <CreateItems classType={'doctor'} Icon={UserMedical} isMenuOpen={isMenuOpen} />;
    case 14: return <IndexItems classType={'especialidad'} Icon={StethoscopeLight} IconSearch={HearthSearch} IconPlus={HearthPlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 15: return <QueryItems classType={'especialidad'} Icons={Icons} title={'Especialidades'}  isMenuOpen={isMenuOpen} />;
    case 16: return <CreateItems classType={'especialidad'} Icon={Stethoscope} isMenuOpen={isMenuOpen} />;
    case 17: return <IndexItems classType={'consultorio'} Icon={HomeIndex} IconSearch={HomeSearch} IconPlus={HomePlus} menu={menu} setMenu={setMenu} isMenuOpen={isMenuOpen} />;
    case 18: return <QueryItems classType={'consultorio'} Icons={Icons} title={'Consultorios'}  isMenuOpen={isMenuOpen} />;
    case 19: return <CreateItems classType={'consultorio'} Icon={HomeMedical} isMenuOpen={isMenuOpen} />;
    default: return <IndexScreen Icons={Icons} isMenuOpen={isMenuOpen} />;
  }
}
export default memo(TemplateScreen);