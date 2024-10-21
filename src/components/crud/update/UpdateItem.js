import { useState } from 'react';
import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';
import { useFetch } from '../../../hooks/useFetch';
import { myColor } from '../../../global';

export const UpdateItem = ({ Icon, item, urlApi, title, buttons, setOpen, setAlert, Row, states }) => {
  const objectName = Object.keys(item)[0];                                      // Obtiene el nombre del objeto para saber su tipo
  let statesData = [];

  const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;
  const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
  const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
  const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
  const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
  const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;
  let [array, setArray] = useState([]);

  const handleSelect = (event) => { 
      switch( event.target.id ) {
        case 'paciente': setArray(pacientes); break;
        case 'doctor': setArray(doctores); break;
        case 'consultorio': setArray(consultorios); break;
        case 'tratamiento': setArray(tratamientos); break;
        case 'eps': setArray(epss); break;
        case 'genero': setArray(generos); break;
      }
  };

  
  const handleUpdate = () => {
    states.forEach(state => { statesData.push(Object.values(state)[0]) });      // Arreglo con los datos de cada parámetro

    if(statesData.filter(state => state === '').length === 0) {                 // Verifica que no hayan campos vacios
      Object.keys(item[objectName]).forEach((parameter,index) => { item[objectName][parameter] = statesData[index] });   // Actualiza los nuevos valores en el item
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
            let arrayResponse;
            await fetch(urlApi)                                                 //API Restful para consumo de las tablas de la base de datos
                .then(response => response.json())
                .then(data => arrayResponse = data);
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} />);

            setAlert('successUpdate')
          }
          else { setAlert('errorUpdate') }
        },
        function(error) { setAlert('errorUpdate') }
      )
    }
  };

  return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={5} width={5} strokeWidth={0.6} className={'center'} /></center>
                <h4 className={'modalTitle main-color pt-3'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead><tr><th>Parámetro</th><th>Datos</th></tr></thead>
                    <tbody>
                      <tr><td> Código </td><td><input type="number" value={ item.id } className="modalInput pe-none" disabled></input></td></tr>
                      {
                        states.map((state,index)=>{ return(
                          <tr key={index}>
                            <td>{ Object.keys(item[objectName])[index].charAt(0).toUpperCase() + Object.keys(item[objectName])[index].slice(1) }</td>
                            {
                              eval(JSON.stringify(Object.values(state)[1])) === 'dropdown' 
                                                              ? <td>
                                                                  <select id={ Object.keys(states[index])[0] } onClick={ handleSelect }>
                                                                    <option value={ states[index][Object.keys(states[index])[0]] }>{ states[index][Object.keys(states[index])[0]] }</option>
                                                                    { 
                                                                      array.map((item) => { 
                                                                        switch( Object.keys(item)[0] ) {
                                                                          case 'paciente': return( <option value={item.paciente.nombre + " " + item.paciente.apellido}>{item.paciente.nombre + " " + item.paciente.apellido}</option> );
                                                                          case 'doctor': return( <option value={item.doctor.nombre + " " + item.doctor.apellido}>{item.doctor.nombre + " " + item.doctor.apellido}</option> );
                                                                          case 'consultorio': return( <option value={item.consultorio.numero}>{item.consultorio.numero + " - " + item.consultorio.nombre}</option> );
                                                                          case 'tratamiento': return( <option value={item.tratamiento.nombre}>{item.tratamiento.nombre}</option> );
                                                                          case 'eps': return( <option value={item.eps.nombre}>{item.eps.nombre}</option> );
                                                                          case 'genero': return( <option value={item.genero.nombre}>{item.genero.nombre}</option> );
                                                                        }
                                                                      })          
                                                                    }
                                                                  </select>
                                                                </td>
                                                              : <td><input type={ eval(JSON.stringify(Object.values(state)[1])) } value={ eval(JSON.stringify(Object.values(state)[0])) } onChange={ Object.values(states[index])[2] } className="modalInput"></input></td>
                            }
                          </tr>
                        )})
                      }
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                    {
                        buttons === 1 ? <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                      : buttons === 2 ? <>
                                          <button className={'aceptBtn'} onClick={() => {handleUpdate();setAlert(true);setOpen(false)}}>Actualizar</button>
                                          <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                                        </>
                      : ""
                    }
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};