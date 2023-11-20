import React from 'react'


export const EditarPaciente = ({paciente,pacientesPrueba}) => {
  // const [inputValue, setInputValue] = useState('');
  //   const handleInputChange = ( e ) => {
  //       setInputValue( e.target.value );}
  //       const editGuardar = ( e ) => {
  //         e.preventDefault();
  //       }  
  return (
    <div>
      <table>
        <th colSpan={2}>Editar Paciente</th>
         <tr>
            <td>Paciente: </td>
            <td><input id='IDPacienteEdit' type='text' autoComplete='off' defaultValue={paciente[0]} /></td>
         </tr>
         <tr>
            <td>Nombre: </td>
            <td><input id='nombrePacienteEdit' type='text' autoComplete='off' defaultValue={paciente[1]}/></td>
         </tr>
         <tr>
            <td>Apellido: </td>
            <td><input id='apellidoPacienteEdit' type='text' autoComplete='off' defaultValue={paciente[2]}/></td>
          </tr>
          <tr>
            <td>Fecha: </td>
            <td><input id='fechaPacienteEdit' type='date' autoComplete='off' value={paciente[3]}/></td>
          </tr>
          <tr>
          <td>Genero: </td>
            <td><select id="generoPacienteEdit" value={paciente[4]}>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                      </select>

            </td>
          </tr>
          <tr>
         <td>Cedula: </td>
         <input id='cedulaPacienteEdit' type='number' autoComplete='off' defaultValue={paciente[5]}/>
         </tr>
         <tr>
         <td>Eps: </td>
         <td><select id="EpsPacienteEdit" value={paciente[6]}>
              <option value="Nueva Eps">Nueva Eps</option>
              <option value="EPS Sanitas">EPS Sanitas</option>
              <option value="Saludcoop">Saludcoop</option>
          </select></td>
          </tr>
          <tr>
            <td><button onClick={()=>Guardar()}>Guardar</button></td>
          </tr>
          </table>
    </div>
    
  )
}
function Guardar(){
  alert('puta')
}

export default EditarPaciente;