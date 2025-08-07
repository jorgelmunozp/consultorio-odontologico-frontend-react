import '../modal/modal.css';
import { myColor } from '../../global.js';

export const ReadItem = ({ classType, Icon, item, setOpen }) => {
  const keys = Object.keys(item[classType]);                      // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                  // Valores de cada parámetro del objeto
  let valuesData = [];
  
  values.forEach(value => {                                       // Arreglo con los datos de los valores de cada parámetro del objeto
    if(typeof value === 'object') { 
      valuesData.push( Object.values(value)[0] + " " + Object.values(value)[1] );
    } else { valuesData.push( value ) }
  }); 

  const handleClose = () => {                                     // Gestiona el cierre del modal
    setOpen(false);
    document.getElementById('modal').remove();
    document.getElementById('body').classList.remove('noScroll');
  }
  
    return (
        <>
          <div className={'modalContainer justify-items-center'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
                <h6 className={'modalTitle main-color pt-2'}>{ classType.charAt(0).toUpperCase() + classType.slice(1) }</h6>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2 overflow-auto'>
                  <div className='row modalTableTitle flex-nowrap'>
                    <div className='col-6'>Parámetro</div>
                    <div className='col-6'>Datos</div>
                  </div>
                  <div className='row flex-nowrap'>
                    <div className='col-6 modalTableData text-start'>Código</div>
                    <div className='col-6 modalTableData text-start'>{ item.id }</div>
                  </div>
                  {
                    valuesData.map((data,index)=>{ return(
                        <div key={ keys[index].toLowerCase() } className='row flex-nowrap'>
                          <div className='col-6 modalTableData text-start'>{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</div>
                          <div className='col-6 modalTableData text-start'>{ data }</div>
                        </div>
                    )})
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-grid mt-2 w-100'}>
                  <button className={'aceptBtn mx-auto w-50'} onClick={ handleClose }>Aceptar</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={ handleClose }></div>
        </>
      )
};