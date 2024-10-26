import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../helpers/fetchUpdate';
import { useFetch } from '../../hooks/useFetch';
import { myColor } from '../../global';
import '../modal/modal.css';

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, setAlert, Row, state }) => {
  let stateValues = [];                                                         // Arreglo con los datos de cada parámetro del objeto
 
  useEffect(()=>{
      state[0].setState(item[classType].numero)
      state[1].setState(item[classType].nombre)
  },[])
  // console.log("item[classType]: ", item[classType])

  // console.log("state: ", state)


  const handleUpdate = () => {
    state.forEach(property => stateValues.push(Object.values(property)[0]) );   // Push en el arreglo con los valores de los datos de cada parámetro del objeto

    if(stateValues.filter(state => state === '').length === 0) {                // Verifica que no hayan campos vacios
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
                <div className='container-fluid modalTable mt-2'>
                  <div className='row modalTableTitle'>
                    <div className='col'>Parámetro</div>
                    <div className='col'>Datos</div>
                  </div>
                  <div className='row'>
                    <div className='col modalTableData'>Código</div>
                    <div className='col modalTableData text-start'><input type="number" value={ item.id } className="modalInput pe-none" disabled></input></div>
                  </div>
                  {
                    state.map((property,index)=>{ 
                      return(
                        <div key={index} className='row'>
                          <div className='col modalTableData'>{ Object.keys(item[classType])[index].charAt(0).toUpperCase() + Object.keys(item[classType])[index].slice(1) }</div>
                          <div className='col modalTableData text-start'>
                            {
                              property.type === 'dropdown' 
                                    ? <Dropdown property={property} />
                                    : <input type={ property.type } value={ property.value } onChange={ property.handleChange } className="modalInput"></input>
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                  <button className={'aceptBtn'} onClick={() => { handleUpdate(); setAlert(true); setOpen(false) }}>Actualizar</button>
                  <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};

const Dropdown = ({ property }) => {
  const key = property.key;
  let index = "";
  let valueItem = '';
  switch(key) { 
    case 'paciente': index = 0; (property[key].length !== 0) ? valueItem = property[key].nombre + " " + property[key].apellido : valueItem = ''; break;
    case 'doctor': index = 1; (property[key].length !== 0) ? valueItem = property[key].nombre + " " + property[key].apellido : valueItem = ''; break;
    case 'consultorio': index = 2; (property[key].length !== 0) ? valueItem = property[key].numero + " " + property[key].nombre : valueItem = ''; break;
    case 'tratamiento': index = 3; (property[key].length !== 0) ? valueItem = property[key] : valueItem = ''; break;
    case 'eps': index = 4; (property[key].length !== 0) ? valueItem = property[key] : valueItem = ''; break;
    case 'genero': index = 5; (property[key].length !== 0) ? valueItem = property[key] : valueItem = ''; break;
    case 'especialidad': index = 6; (property[key].length !== 0) ? valueItem = property[key] : valueItem = ''; break;
  };

  console.log("property[key] UpdateItem: ",property[key])

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
    { option: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
    { option: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
    { option: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
    { option: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
    { option: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
    { option: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
    { option: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(tratamientos) }
  ];

  return (
    <select key={ key+"UpdateDropdown" } onFocus={ statesDropdown[index].handleSelect } onChange={ property.handleChange } id={ key+"UpdateDropdown" } >
      {/* <option value={ valueItem }>{ valueItem }</option> */}
      <option value={ property[key] }>{ valueItem }</option>
      { 
        statesDropdown[index].option.map((item) => {
          switch( Object.keys(item)[0] ) {
            case 'paciente': return( <option value={item[key]}>{ item[key].nombre + " " + item[key].apellido} </option> );
            case 'doctor': return( <option value={item[key]}>{ item[key].nombre + " " + item[key].apellido }</option> );
            case 'consultorio': return( <option value={item[key]}>{ item[key].numero + " " + item[key].nombre }</option> );
            case 'tratamiento': return( <option value={item[key].nombre}>{ item[key].nombre }</option> );
            case 'eps': return( <option value={item[key].nombre}>{ item[key].nombre }</option> );
            case 'genero': return( <option value={item[key].nombre}>{ item[key].nombre }</option> );
            case 'especialidad': return( <option value={item[key].nombre}>{ item[key].nombre }</option> );
          }
        })          
      }
    </select>
  )
}