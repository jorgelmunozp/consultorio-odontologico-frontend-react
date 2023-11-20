import React from 'react'


export const EditarTratamientos = ({tratamientos,tratamientosPrueba}) => {
  // const [inputValue, setInputValue] = useState('');
  //   const handleInputChange = ( e ) => {
  //       setInputValue( e.target.value );}
  //       const editGuardar = ( e ) => {
  //         e.preventDefault();
  //       }  
  return (
    <div>
      <table>
        <th colSpan={2}>Editar tratamientos</th>
        <tr> 
            <td>tratamientos: </td>
            <td><input id='IDTratamientosEdit' type='text' autoComplete='off' defaultValue={tratamientos[0]} /></td>
         </tr>
         <tr>
            <td>Nombre: </td>
            <td><input id='nombreTratamientoEdit' type='text' autoComplete='off' defaultValue={tratamientos[1]}/></td>
         </tr>
         <tr>
            <td>Doctor: </td>
            <td><input id='tratamientoDoctorEdit' type='text' autoComplete='off' defaultValue={tratamientos[2]}/></td>
          </tr>
          <tr>
            <td>Financiado: </td>
            <td><input id='financiadoTratamientoEdit' type='number' autoComplete='off' defaultValue={tratamientos[3]}/></td>
         </tr>
         <tr>
            <td>Contado: </td>
            <td><input id='contadoTratamientoEdit' type='number' autoComplete='off' defaultValue={tratamientos[4]}/></td>
         </tr>
         <tr>
            <td>Ventas: </td>
            <td><input id='VentasTratamientoEdit' type='number' autoComplete='off' defaultValue={tratamientos[5]}/></td>
         </tr>
         <tr>
            <td>Total: </td>
            <td><input id='TotalTratamientoEdit' type='number' autoComplete='off' defaultValue={tratamientos[6]}/></td>
         </tr>
         <tr>
            <td colSpan={2}><button onClick={()=>Guardar()}>Guardar</button></td>
          </tr>
          </table>
    </div>
    
  )
}
function Guardar(){
  alert('Hola')
}

export default EditarTratamientos;