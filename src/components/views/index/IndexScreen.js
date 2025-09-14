import '../../../assets/styles/App.css';
import { lazy, memo, useState, useMemo, useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import { background } from '../../banners/background/background.js';
import { myColor, myTitle, iconHeight, iconWidth } from  '../../../global.js';

const CrudItems = memo( lazy(() => import('../../crud/views/CrudItems.js')) );
const Logo = memo( lazy(() => import('../../icons/logo/Logo.js')) );
const CalendarMedical = lazy(() => import('../../icons/calendar/CalendarMedical.js'));
const UserInjured = lazy(() => import('../../icons/user/UserInjured.js'));
const UserMedical = lazy(() => import('../../icons/user/UserMedical.js'));
const Stethoscope = lazy(() => import('../../icons/medical/Stethoscope.js'));
const HomeMedical = lazy(() => import('../../icons/home/HomeMedical.js'));
const Syringe = lazy(() => import('../../icons/medical/Syringe.js'));

export const IndexScreen = () => {
  let [view, setView] = useState(0);

  const { theme } = useThemeContext();        // 👈 Call the global theme

  //👇 Estilos memorizados para no recrear el objeto en cada render
  const headerStyle = useMemo(() => ({ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'repeat' }), []);

  // 👇 Handler memorizado para evitar recrearlo en cada render
  const handleChangeView = useCallback((index) => { setView(index) }, [setView]);

  // 👇 Servicios memorizados para que no se regenere el array
  const services = useMemo( () => {
    const servicesSuite = [
      { type:"cita", title:"Citas", Icon:CalendarMedical },
      { type:"paciente", title:"Pacientes", Icon:UserInjured },
      { type:"doctor", title:"Doctores", Icon:UserMedical },
      { type:"especialidad", title:"Especialidades", Icon:Stethoscope },
      { type:"consultorio", title:"Consultorios", Icon:HomeMedical },
      { type:"tratamiento", title:"Tratamientos", Icon:Syringe }
    ];
    return servicesSuite.map(s => ({ ...s, icon: <s.Icon height={iconHeight} width={iconWidth}/> }));
  }, []);

  // 👇 Servicios memorizados
  const menu = useMemo(() =>
    services.map((service,index) => {
      return (
        <div key={service.type} className={"col-2 nav-item nav-link text-center"}>
          <div className={"card bg-theme border-0 rounded-0 pt-0 hover"} data-theme={theme}>
            <button onClick={() => handleChangeView(index)} className="bg-transparent border-0">
              <div className={`card-body bg-transparent jumpHover ${view === index ? 'bounce' : ''}`}>
                <i className={(view === index ? ' main-color':' gray-color')}>{ service.icon }</i>
                <h6 className={`d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2 ${view === index ? 'main-color' : 'gray-color'}`}>{ service.title }</h6>
              </div>
            </button>
          </div>
        </div>
      )
  }), [services, theme, view, handleChangeView] );

  // 👇 Vistas memorizadas
  const crudViews = useMemo(() => services.map(service => ( <CrudItems key={service.type} classType={service.type}  title={service.title} /> )), [services]);

  if (process.env.NODE_ENV === 'development') console.log('[Index Screen 👍]');

  return (
    <div className="App bg-theme color-theme user-select-none" data-theme={theme}>
        <div className='container-fluid px-0 pt-2 me-0 smoothw-100'>
          <div id='headerIndex' style={headerStyle} className='pt-5 pb-5 z-0 smooth shadow' data-bs-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu">
            <Logo color={myColor} height={7} width={7} strokeWidth={0.9} className={'jumpHover themed-logo'} />
            <h1 className='main-color fw-semibold jumpHover'>{ myTitle }</h1>
          </div>
           {/* 👇 Menú */}
          <div id="collapseMenu" className="row container-fluid bg-transparent mx-auto collapse shadow">   
            { menu }
          </div>

          <SwipeableViews index={view} onChangeIndex={handleChangeView} enableMouseEvents>
            { crudViews }
          </SwipeableViews>
        </div>
    </div>
  )
}

export default memo(IndexScreen);