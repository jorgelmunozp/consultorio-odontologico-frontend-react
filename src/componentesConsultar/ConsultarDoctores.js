const ConsultarDoctores = ({ urlApidoctores }) => {
  fetch(urlApidoctores)                 //API REST para la simulación de la tabla doctores de la base de datos
    .then(response => response.json())
    .then(doctores => {

      let contenidoDoctores = document.getElementById('contenidoDoctores');

      const headerDoctores =  `  
          <div class="columnaContenido">
            <center>
              <hr/>
              <h4> Doctores Disponibles </h4>
              <hr/>
              <br/><br/>
              <table border='1'>
                <tr>
                  <th> Id </th>
                  <th> Nombre </th>
                  <th> Apellido </th>
                  <th> Especialidad </th>
                  <th colSpan='3'> </th>
                </tr>       
      `;

      let bodyDoctores = [];
      for (const [i] of doctores.entries()) {
      
        bodyDoctores[i] = `
              <tr>
                <td> ${doctores[i].id} </td>
                <td> ${doctores[i].doctor.nombre} </td>
                <td> ${doctores[i].doctor.apellido} </td>
                <td> ${doctores[i].doctor.especialidad} </td>
                <td><button class='App-body-boton-vistas' onClick={()=>&#128270;</button></td>
                <td><button class='App-body-boton-vistas' onClick={()=>&#x270D;</button></td>
                <td><button class='App-body-boton-vistas color-rojo' onClick={()=>&#x1F7AE;</button></td>
              </tr>
      `};

      const footerDoctores =  `  
                </table>
              </center>
            </div>
      `;

      contenidoDoctores.innerHTML = headerDoctores + bodyDoctores.join('') + footerDoctores;

    })
  return (
    <div className="App">
      <div id="contenidoDoctores">

      </div>
    </div>
  )
}

export default ConsultarDoctores;