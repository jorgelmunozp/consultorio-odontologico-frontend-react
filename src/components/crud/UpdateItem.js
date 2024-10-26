import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../helpers/fetchUpdate';
import { useFetch } from '../../hooks/useFetch';
import { myColor } from '../../global';
import '../modal/modal.css';

export const UpdateItem = ({ Icon, item, urlApi, buttons, setOpen, setAlert, Row, state }) => {
  const classType = Object.keys(item)[0];                                         // Obtiene la Classe del objeto
  let stateValues = [];                                                          // Arreglo con los datos de cada parámetro del objeto
 
  const handleUpdate = () => {
    state.forEach(property => stateValues.push(Object.values(property)[0]) );  // Push en el arreglo con los valores de los datos de cada parámetro del objeto

    if(stateValues.filter(state => state === '').length === 0) {                 // Verifica que no hayan campos vacios
      Object.keys(item[classType]).forEach((property,index) => { item[classType][property] = stateValues[index] });   // Actualiza los nuevos valores en el item
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);   // Fetch PUT para actualización de datos
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
            await fetch(urlApi)                                                 // API Restful para consumo de las tablas de la base de datos
                .then(response => response.json())
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row item={ item } urlApi={urlApi} />);

            setAlert('successUpdate')
          }
          else { setAlert('errorUpdate') }
        },
        function(error) { setAlert('Error Update: ', error) }
      )
    }
  };

  return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={5} width={5} strokeWidth={0.6} className={'center'} /></center>
                <h4 className={'modalTitle main-color pt-3'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead><tr><th>Parámetro</th><th>Datos</th></tr></thead>
                    <tbody>
                      <tr><td> Código </td><td><input type="number" value={ item.id } className="modalInput pe-none" disabled></input></td></tr>
                      {
                        state.map((property,index)=>{ 
                          return(
                            <tr key={index}>
                              <td>{ Object.keys(item[classType])[index].charAt(0).toUpperCase() + Object.keys(item[classType])[index].slice(1) }</td>
                              <td>
                                {
                                  eval(JSON.stringify(Object.values(property)[1])) === 'dropdown' 
                                                                ? <Dropdown property={property} />
                                                                : <input type={ eval(JSON.stringify(Object.values(property)[1])) } value={ eval(JSON.stringify(Object.values(property)[0])) } onChange={ Object.values(property)[2] } className="modalInput"></input>
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                  <>
                    <button className={'aceptBtn'} onClick={() => {handleUpdate();setAlert(true);setOpen(false)}}>Actualizar</button>
                    <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};

const Dropdown = ({ property }) => {
  const classType = Object.keys(property)[0];
  let index = "";
  let valueItem = '';
  switch(classType) { 
    case 'paciente': index = 0; (property[classType].length !== 0) ? valueItem = property[classType].nombre + " " + property[classType].apellido : valueItem = ''; break;
    case 'doctor': index = 1; (property[classType].length !== 0) ? valueItem = property[classType].nombre + " " + property[classType].apellido : valueItem = ''; break;
    case 'consultorio': index = 2; (property[classType].length !== 0) ? valueItem = property[classType].numero + " " + property[classType].nombre : valueItem = ''; break;
    case 'tratamiento': index = 3; (property[classType].length !== 0) ? valueItem = property[classType].nombre : valueItem = ''; break;
    case 'eps': index = 4; (property[classType].length !== 0) ? valueItem = property[classType].nombre : valueItem = ''; break;
    case 'genero': index = 5; (property[classType].length !== 0) ? valueItem = property[classType].nombre : valueItem = ''; break;
    case 'especialidad': index = 6; (property[classType].length !== 0) ? valueItem = property[classType].nombre : valueItem = ''; break;
  };

  const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las aPI para obtención de los datos
  const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
  const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
  const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
  const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
  const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;

  const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
  const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
  const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
  const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
  const [epssDropdown, setEpssDropdown] = useState(epss);
  const [generosDropdown, setGenerosDropdown] = useState(generos);
  const [especialidadesDropdown, setEspecialidadesDropdown] = useState(tratamientos);
  const statesDropdown = [
    { paciente: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
    { doctor: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
    { consultorio: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
    { tratamiento: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
    { eps: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
    { genero: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
    { especialidad: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(tratamientos) }
  ];

  return (
    <select key={ classType+"UpdateDropdown" } onFocus={ Object.values(statesDropdown[index])[1] } onChange={ Object.values(property)[2] } id={ classType+"UpdateDropdown" } >
      <option value={ valueItem }>{ valueItem }</option>
      { 
        Object.values(statesDropdown[index])[0].map((item) => {
          console.log("item[classType] UpdateItem: ",item[classType])

          switch( Object.keys(item)[0] ) {
            case 'paciente': return( <option value={item[classType]}>{ item[classType].nombre + " " + item[classType].apellido} </option> );
            case 'doctor': return( <option value={item[classType]}>{ item[classType].nombre + " " + item[classType].apellido }</option> );
            case 'consultorio': return( <option value={item[classType]}>{ item[classType].numero + " " + item[classType].nombre }</option> );
            case 'tratamiento': return( <option value={item[classType].nombre}>{ item[classType].nombre }</option> );
            case 'eps': return( <option value={item[classType].nombre}>{ item[classType].nombre }</option> );
            case 'genero': return( <option value={item[classType].nombre}>{ item[classType].nombre }</option> );
            case 'especialidad': return( <option value={item[classType].nombre}>{ item[classType].nombre }</option> );
          }
        })          
      }
    </select>
  )
}