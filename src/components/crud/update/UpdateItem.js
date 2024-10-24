import { useState } from 'react';
import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';
import { useFetch } from '../../../hooks/useFetch';
import { myColor } from '../../../global';

export const UpdateItem = ({ Icon, item, urlApi, title, buttons, setOpen, setAlert, Row, state }) => {
  const classType = Object.keys(item)[0];                                         // Obtiene la Classe del objeto

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
    { paciente: pacientesDropdown, handleSelect: (event) => setPacientesDropdown(pacientes) },
    { doctor: doctoresDropdown, handleSelect: (event) => setDoctoresDropdown(doctores) },
    { consultorio: consultoriosDropdown, handleSelect: (event) => setConsultoriosDropdown(consultorios) },
    { tratamiento: tratamientosDropdown, handleSelect: (event) => setTratamientosDropdown(tratamientos) },
    { eps: epssDropdown, handleSelect: (event) => setEpssDropdown(epss) },
    { genero: generosDropdown, handleSelect: (event) => setGenerosDropdown(generos) },
    { especialidad: especialidadesDropdown, handleSelect: (event) => setEspecialidadesDropdown(tratamientos) }
  ];

  let statesData = [];                                                          // Arreglo con los datos de cada parámetro del objeto
 
  const handleUpdate = () => {
    state.forEach(parameter => statesData.push(Object.values(parameter)[0]) );  // Push en el arreglo con los valores de los datos de cada parámetro del objeto

    if(statesData.filter(state => state === '').length === 0) {                 // Verifica que no hayan campos vacios
      Object.keys(item[classType]).forEach((parameter,index) => { item[classType][parameter] = statesData[index] });   // Actualiza los nuevos valores en el item
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);   // Fetch PUT para actualización de datos
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
            // let arrayResponse;
            await fetch(urlApi)                                                 // API Restful para consumo de las tablas de la base de datos
                .then(response => response.json())
                // .then(data => arrayResponse = data);
      
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
                <h4 className={'modalTitle main-color pt-3'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead><tr><th>Parámetro</th><th>Datos</th></tr></thead>
                    <tbody>
                      <tr><td> Código </td><td><input type="number" value={ item.id } className="modalInput pe-none" disabled></input></td></tr>
                      {
                        state.map((parameter,index)=>{ 
                          return(
                            <tr key={index}>
                              <td>{ Object.keys(item[classType])[index].charAt(0).toUpperCase() + Object.keys(item[classType])[index].slice(1) }</td>
                              <td>
                                {
                                  eval(JSON.stringify(Object.values(parameter)[1])) === 'dropdown' 
                                                                ? <Dropdown parameter={parameter} statesDropdown={statesDropdown} />
                                                                : <input type={ eval(JSON.stringify(Object.values(parameter)[1])) } value={ eval(JSON.stringify(Object.values(parameter)[0])) } onChange={ Object.values(parameter)[2] } className="modalInput"></input>
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

const Dropdown = ({ parameter, statesDropdown }) => {
  const classType = Object.keys(parameter)[0];
  let index = "";
  switch(classType) { case 'paciente': index = 0; break;
                      case 'doctor': index = 1; break;
                      case 'consultorio': index = 2; break;
                      case 'tratamiento': index = 3; break;
                      case 'eps': index = 4; break;
                      case 'genero': index = 5; break;
                      case 'especialidad': index = 6; break;
  };

  let key = '';
  let value = '';
  if(typeof Object.values(parameter)[0] === 'object') {
    key = Object.keys(Object.values(parameter)[0])[0];
    value = Object.values(Object.values(parameter)[0])[0] + " " + Object.values(Object.values(parameter)[0])[1];
  } else {
    key = Object.keys(parameter)[0];
    value = Object.values(parameter)[0];
  }

  return (
    <select key={ key } id={ key } onFocus={ Object.values(statesDropdown[index])[1] } onChange={ Object.values(parameter)[2] }>
      <option value={ value }>{ value }</option>
      { 
        Object.values(statesDropdown[index])[0].map((item) => {
          switch( Object.keys(item)[0] ) {
            case 'paciente': return( <option value={item.paciente.nombre + " " + item.paciente.apellido}>{item.paciente.nombre + " " + item.paciente.apellido}</option> );
            case 'doctor': return( <option value={item.doctor.nombre + " " + item.doctor.apellido}>{item.doctor.nombre + " " + item.doctor.apellido}</option> );
            case 'consultorio': return( <option value={item.consultorio.numero + " " + item.consultorio.nombre}>{item.consultorio.numero + " " + item.consultorio.nombre}</option> );
            case 'tratamiento': return( <option value={item.tratamiento.nombre}>{item.tratamiento.nombre}</option> );
            case 'eps': return( <option value={item.eps.nombre}>{item.eps.nombre}</option> );
            case 'genero': return( <option value={item.genero.nombre}>{item.genero.nombre}</option> );
            case 'especialidad': return( <option value={item.tratamiento.nombre}>{item.tratamiento.nombre}</option> );
          }
        })          
      }
    </select>
  )
}