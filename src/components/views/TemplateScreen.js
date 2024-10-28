
import { useState } from 'react';
import { IndexScreen } from './index/IndexScreen';
import { QueryItems } from '../crud/QueryItems';
import { CreateItem } from '../crud/CreateItem';
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
              <Menu menu={menu} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Menu = ({ menu }) => {                            // Componente para elegir vista a renderizar
  switch (menu) {
    case 1: return <IndexScreen />;
    case 2: return <QueryItems classType={'cita'} />;
    case 3: return <CreateItem classType={'cita'} Icon={FaCalendarPlus} />;
    case 4: return <QueryItems classType={'paciente'} />;
    case 5: return <CreateItem classType={'paciente'} Icon={FaUserInjured} />;
    case 6: return <QueryItems classType={'tratamiento'} />;
    case 7: return <CreateItem classType={'tratamiento'} Icon={FaStethoscope} />;
    case 8: return <QueryItems classType={'doctor'} />;
    case 9: return <CreateItem classType={'doctor'} Icon={FaUserMd} />;
    case 10: return <QueryItems classType={'consultorio'} />;
    case 11: return <CreateItem classType={'consultorio'} Icon={FaClinicMedical} />;
    default: return <IndexScreen />;
  }
}