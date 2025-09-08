import { lazy, memo, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import { background } from '../../banners/background/background.js';
import { myColor, myTitle, iconHeight, iconWidth } from  '../../../global.js';

const QueryItems = memo(  lazy(() => import('../../crud/views/QueryItems.js')) );
const Logo = memo( lazy(() => import('../../icons/logo/Logo.js')) );

export const IndexScreen = ({ Icons, isMenuOpen }) => {
  let [view, setView] = useState(0);

  const { theme } = useThemeContext();        // 👈 Call the global theme

  const services = [
    { "title":"Citas", "icon":<Icons.CitaMenu height={iconHeight} width={iconWidth} /> },
    { "title":"Pacientes", "icon":<Icons.PacienteMenu height={iconHeight} width={iconWidth} /> },
    { "title":"Doctores", "icon":<Icons.DoctorMenu height={iconHeight} width={iconWidth} /> },
    { "title":"Especialidades", "icon":<Icons.EspecialidadMenu height={iconHeight} width={iconWidth} /> },
    { "title":"Consultorios", "icon":<Icons.ConsultorioMenu height={iconHeight} width={iconWidth} /> },
    { "title":"Tratamientos", "icon":<Icons.TratamientoMenu height={iconHeight} width={iconWidth} /> }
  ];

  return (
    <div className="App">
        <div className={"container-fluid px-0 pt-2 me-0 smooth" + (isMenuOpen ? ' w-responsive':' w-100')}>
          <div id='headerIndex' style={{ backgroundImage:`url(${background})`, backgroundPosition:'center', backgroundRepeat:'repeat'}} className='pt-5 pb-5 z-0 smooth shadow' data-bs-toggle="collapse" href="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu">
            <Logo color={myColor} height={7} width={7} strokeWidth={0.9} className={'jumpHover themed-logo'} />
            <h1 className='main-color fw-semibold jumpHover'>{ myTitle }</h1>
          </div>
          <div id="collapseMenu" className="row bg-transparent collapse shadow">   
            {
              services.map((service,index) => {
                return (
                  <div key={ service.title + index } className={"col-2 nav-item nav-link text-center"}>
                    <div id={"menuIndex"} className={"card border-0 rounded-0 pt-0 hover"} data-theme={theme}>
                      <button onClick={() => setView(index)} className="bg-transparent border-0">
                        <div className={"card-body bg-transparent jumpHover" + (view === index ? ' bounce':'')}>
                          <i className={(view === index ? ' main-color':' gray-color')}>{ service.icon }</i>
                          <h6 className={"d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2" + (view === index ? ' main-color':' gray-color')}>{ service.title }</h6>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <SwipeableViews index={view} onChangeIndex={(indexLatest) => setView(indexLatest)} enableMouseEvents>
            <QueryItems classType={'cita'} Icons={Icons} />
            <QueryItems classType={'paciente'} Icons={Icons} />
            <QueryItems classType={'doctor'} Icons={Icons} />
            <QueryItems classType={'especialidad'} Icons={Icons} />
            <QueryItems classType={'consultorio'} Icons={Icons} />
            <QueryItems classType={'tratamiento'} Icons={Icons} />
          </SwipeableViews>
        </div>
    </div>
  )
}

export default memo(IndexScreen);