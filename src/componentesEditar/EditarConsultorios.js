import React from 'react'


export const EditarConsultorios = ({consultorios,consultoriosPrueba}) => {
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
            <td>ID: </td>
            <td><input id='IDconsultoriosEdit' type='text' autoComplete='off' defaultValue={consultorios[0]} /></td>
         </tr>
         <tr>
            <td>Nombre: </td>
            <td><input id='nombrePacienteEdit' type='text' autoComplete='off' defaultValue={consultorios[1]}/></td>
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

export default EditarConsultorios;