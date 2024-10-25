import '../../modal/modal.css';
import { myColor } from '../../../global';

export const ReadItem = ({ Icon, item, setOpen }) => {
  const classType = Object.keys(item)[0];                       // Obtiene el nombre del objeto para saber su Classe
  const keys = Object.keys(item[classType]);                    // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                // Valores de cada parámetro del objeto
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
                <center><Icon color={myColor} height={5} width={5} strokeWidth={0.6} className={'center'} /></center>
                <h4 className={'modalTitle main-color pt-3'}>{ classType.charAt(0).toUpperCase() + classType.slice(1) }</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                      <tr><td> Código </td><td>{ item.id }</td></tr>
                      {
                        valuesData.map((data,index)=>{ return(
                            <tr key={ keys[index].toLowerCase() }>
                              <td>{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</td>
                              <td>{ data }</td>
                            </tr>
                        )})
                      }
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                  <button className={'aceptBtn'} onClick={(event) => setOpen(false)}>Aceptar</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};