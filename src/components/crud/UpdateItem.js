import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { DropdownClass } from '../../classes/Dropdown';
import { fetchUpdate } from '../../helpers/fetchUpdate';
import { CalendarEdit } from '../icons/calendar/CalendarEdit';
import { UserEdit } from '../icons/user/UserEdit';
import { HomeEdit } from '../icons/home/HomeEdit';
import { FilterEdit } from '../icons/filter/FilterEdit';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { Input } from '../forms/inputs/Input';
import { myColor } from '../../global';
import '../modal/modal.css';

import sign from 'jwt-encode';                                                  // Para firma con jwt
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const UpdateItem = ({ classType, item, urlApi, setOpen, setAlert, Row, state }) => { 
  let Icon = '';                                                  // Selección de icono correspondiente
  switch (classType) { case 'cita' : Icon = CalendarEdit; break;
                       case 'paciente': Icon = UserEdit; break;
                       case 'doctor': Icon = UserEdit; break;
                       case 'consultorio': Icon = HomeEdit; break;
                       case 'tratamiento': Icon = FilterEdit; break;
                       case 'especialidad': Icon = FilterEdit; break;
  }
  
  // --- Dropdown
  const myDropdown = new DropdownClass();
  const statesDropdown = myDropdown.state;
  
  let stateValues = [];                                                         // Arreglo con los datos de cada parámetro del objeto
 
  useEffect(()=>{                                                               // Carga los valores del item seleccionado en el estado para su actualización
      state.forEach((property,index) => { property.setState( Object.values(item[classType])[index] ) });
  },[])

  const handleUpdate = () => {
    state.forEach(property => stateValues.push(property.value));                // Push en el arreglo con los valores de los datos de cada parámetro del objeto

    if(stateValues.filter(state => state === '').length === 0) {                // Verifica que no hayan campos vacios
      Object.keys(item[classType]).forEach((property,index) => { item[classType][property] = stateValues[index] });   // Actualiza los nuevos valores en el item
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);   // Fetch PUT para actualización de datos
      fetchResponse.then(
        async function(value) {
            if(200 <= value && value <= 299) { 
            await fetch(urlApi)                                                 // API Restful para actualizar datos en la base de datos
                .then(response => response.json())
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row classType={classType} item={item} urlApi={urlApi} state={state} />);

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
                <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
                <h5 className={'modalTitle main-color pt-2'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h5>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2'>
                  <div className='row modalTableTitle'>
                    <div className='col'>Datos</div>
                  </div>
                  <div className='row'>
                    <div className='col modalTableData text-start'>
                      <Input property={ {key:'código', value:item.id, type:'number'} }  className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} /></div>
                  </div>
                  {
                    state.map((property,index)=>{ 
                      return(
                        <div key={index} className='row'>
                          <div className='col modalTableData text-start'>
                            { property.type === 'dropdown' 
                                  ? <Dropdown property={ property } defaultSelect={ property.value } states={ statesDropdown } className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} />
                                  : <Input property={ property } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-flex mt-3 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={() => { handleUpdate(); setAlert(true); setOpen(false) }}>Actualizar</button>
                  <button className={'cancelBtn w-100'} onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};

// const Dropdown = ({ property }) => {
//   const key = property.key;
//   let index = "";
//   let valueProperty = '';

//   switch(key) { 
//     case 'paciente': index = 0; valueProperty = property.value.nombre + " " + property.value.apellido; break;
//     case 'doctor': index = 1; valueProperty = property.value.nombre + " " + property.value.apellido; break;
//     case 'consultorio': index = 2; valueProperty = property.value.numero + " " + property.value.nombre; break;
//     case 'tratamiento': index = 3; valueProperty = property.value; break;
//     case 'eps': index = 4; valueProperty = property.value; break;
//     case 'genero': index = 5; valueProperty = property.value; break;
//     case 'especialidad': index = 6; valueProperty = property.value; break;
//   };

//   const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las aPI para obtención de los datos
//   const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
//   const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
//   const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
//   const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
//   const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;
//   const especialidades  = useFetch(process.env.REACT_APP_API_ESPECIALIDADES).data;

//   const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
//   const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
//   const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
//   const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
//   const [epssDropdown, setEpssDropdown] = useState(epss);
//   const [generosDropdown, setGenerosDropdown] = useState(generos);
//   const [especialidadesDropdown, setEspecialidadesDropdown] = useState(especialidades);
//   const statesDropdown = [
//     { option: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
//     { option: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
//     { option: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
//     { option: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
//     { option: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
//     { option: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
//     { option: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(especialidades) }
//   ];

//   return (
//     <select onFocus={ statesDropdown[index].handleSelect } onChange={ property.handleChange } id={ key+"Dropdown" } key={ key+"Dropdown" } >
//       <option value={ property.value }>{ valueProperty }</option>
//       { 
//         statesDropdown[index].option.map((item,index) => {
//             switch( key ) {                                                       // Value que se envía al backend firmada con jwt
//             case 'paciente': return( <option value={ sign( item[key],jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].nombre + " " + item[key].apellido} </option> );
//             case 'doctor': return( <option value={ sign( item[key],jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].nombre + " " + item[key].apellido }</option> );
//             case 'consultorio': return( <option value={ sign( item[key],jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].numero + " " + item[key].nombre }</option> );
//             case 'tratamiento': return( <option value={ sign( item[key].especialidad,jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].especialidad }</option> );
//             case 'eps': return( <option value={ sign( item[key].nombre,jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].nombre }</option> );
//             case 'genero': return( <option value={ sign( item[key].nombre,jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].nombre }</option> );
//             case 'especialidad': return( <option value={ sign( item[key].nombre,jwtSecretKey ) } key={ key+"Item"+index }>{ item[key].nombre }</option> );
//           }
//         })          
//       }
//     </select>
//   )
// }