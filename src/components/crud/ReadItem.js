import { CalendarSmile } from '../icons/calendar/CalendarSmile';
import { User } from '../icons/user/User';
import { StethoscopeLight } from '../icons/medical/StethoscopeLight';
import { HomeIndex } from '../icons/home/HomeIndex';

import { myColor } from '../../global';
import '../modal/modal.css';

export const ReadItem = ({ classType, item, setOpen }) => {
  let Icon = '';                                                  // Selección de icono correspondiente
  switch (classType) { case 'cita' : Icon = CalendarSmile; break;
                       case 'paciente': Icon = User; break;
                       case 'doctor': Icon = User; break;
                       case 'consultorio': Icon = HomeIndex; break;
                       case 'tratamiento': Icon = StethoscopeLight; break;
                       case 'especialidad': Icon = StethoscopeLight; break;
  }
  
  const keys = Object.keys(item[classType]);                      // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                  // Valores de cada parámetro del objeto
  let valuesData = [];
  
  values.forEach(value => {                                       // Arreglo con los datos de los valores de cada parámetro del objeto
    if(typeof value === 'object') { 
      valuesData.push( Object.values(value)[0] + " " + Object.values(value)[1] );
    } else { valuesData.push( value ) }
  });  
  
    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
                <h5 className={'modalTitle main-color pt-3'}>{ classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2'>
                  <div className='row modalTableTitle'>
                    <div className='col'>Parámetro</div>
                    <div className='col'>Datos</div>
                  </div>
                  <div className='row'>
                    <div className='col modalTableData'>Código</div>
                    <div className='col modalTableData text-start'>{ item.id }</div>
                  </div>
                  {
                    valuesData.map((data,index)=>{ return(
                        <div key={ keys[index].toLowerCase() } className='row'>
                          <div className='col modalTableData'>{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</div>
                          <div className='col modalTableData text-start'>{ data }</div>
                        </div>
                    )})
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-grid mt-3 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={(event) => setOpen(false)}>Aceptar</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};