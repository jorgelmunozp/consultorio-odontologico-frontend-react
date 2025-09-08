import { useThemeContext } from "../../theme/ThemeContext.js";
import { iconHeight, iconWidth, iconStrokeWidth } from '../../global.js';

export const MenuSide = ({ Icons, menu, setMenu }) => {
    const { theme } = useThemeContext();          // 👈 Call the global theme

  const iconColorHover = theme === 'dark' ? 'white-color-hover' : 'dark-color-hover';

  return(
      <nav className="navbar" data-theme={theme} >
        <div className="offcanvas offcanvas-start bg-transparent" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
          <div className="offcanvas-header justify-content-center align-self-center align-items-center mx-auto w-100 shadow-sm">
            <h5 className="offcanvas-title nav-item">
              <button type="button" className="btn-menu bg-transparent border-0" data-bs-dismiss="offcanvas" aria-label="Close"><Icons.Menu height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth + 0.5} className={'main-color'} /></button>
            </h5>
          </div>
          <div className="offcanvas-body mt-2">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(1)}><Icons.HomeMenu height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 1 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(2)}><Icons.CitaMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 2 ? ' main-color':' gray-color')  } /></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(3)}><Icons.CitaSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 3 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(4)}><Icons.CitaPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 4 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(5)}><Icons.PacienteMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 5 ? ' main-color':' gray-color')  } /></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(6)}><Icons.PacienteSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 6 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(7)}><Icons.PacientePlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 7 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(8)}><Icons.TratamientoMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 8 ? ' main-color':' gray-color')  } /> </button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(9)}><Icons.TratamientoSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 9 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(10)}><Icons.TratamientoPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 10 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(11)}><Icons.DoctorMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 11 ? ' main-color':' gray-color')  } /></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(12)}><Icons.DoctorSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 12 ? ' main-color':' gray-color') }/> </button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(13)}><Icons.DoctorPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 13 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(14)}><Icons.EspecialidadMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 14 ? ' main-color':' gray-color')  } /></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(15)}><Icons.EspecialidadSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 15 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(16)}><Icons.EspecialidadPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 16 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(17)}><Icons.ConsultorioMenu height={iconHeight} width={iconWidth} className={iconColorHover + ' jumpHover' + (menu === 17 ? ' main-color':' gray-color')  } /></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(18)}><Icons.ConsultorioSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 18 ? ' main-color':' gray-color') }/></button></li>
              <li className="nav-item"><button className="nav-link" onClick={()=>setMenu(19)}><Icons.ConsultorioPlus height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={iconColorHover + ' jumpHover' + (menu === 19 ? ' main-color':' gray-color') }/></button></li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default MenuSide;