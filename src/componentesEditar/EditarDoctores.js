import React from 'react'


export const EditarDoctores = ({doctores,doctoresPrueba}) => {
  // const [inputValue, setInputValue] = useState('');
  //   const handleInputChange = ( e ) => {
  //       setInputValue( e.target.value );}
  //       const editGuardar = ( e ) => {
  //         e.preventDefault();
  //       }  
  return (
    <div>
      <table>
        <th colSpan={2}>Editar Doctores</th>
        <tr> 
            <td>Doctores: </td>
            <td><input id='IDDoctoresEdit' type='text' autoComplete='off' defaultValue={doctores[0]} /></td>
         </tr>
         <tr>
            <td>Nombre: </td>
            <td><input id='nombreDoctoresEdit' type='text' autoComplete='off' defaultValue={doctores[1]}/></td>
         </tr>
         <tr>
            <td>Apellido: </td>
            <td><input id='apellidoDoctoresEdit' type='text' autoComplete='off' defaultValue={doctores[2]}/></td>
          </tr>
         <td>Especialidad: </td>
         <td><select id="EspecialidadDocEdit" value={doctores[3]}>
              <option value="Diseño sonrisa">Diseño sonrisa</option>
              <option value="Blanqueamiento">Blanqueamiento</option>
              <option value="Ortodoncia">Ortodoncia</option>
              <option value="Protesis">Protesis</option>
              <option value="Higiene">Higiene</option>
          </select></td>

          <tr>
            <td colSpan={2}><button onClick={()=>Guardar()}>Guardar</button></td>
          </tr>
          </table>
    </div>
    
  )
}
function Guardar(){
  alert('puta')
}

export default EditarDoctores;