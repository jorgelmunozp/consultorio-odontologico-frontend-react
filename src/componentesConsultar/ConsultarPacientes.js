const ConsultarPacientes = ({urlApipacientes}) => {
    fetch(urlApipacientes)                 //API REST para la simulación de la tabla tratamientos de la base de datos
        .then(response => response.json())
        .then(pacientes => {
            let contenidoPacientes = document.getElementById('contenidoPacientes');
            const datosPacientes = [];

            for (const [i] of pacientes.entries()) {
              datosPacientes.push(
                pacientes[i]
              )
            }

            
            const headerPacientes = `
                  <div class="columnaContenido">
                    <center>
                      <hr/> 
                      <h4> Pacientes Afiliados </h4>
                      <hr/>
                      <br/><br/>
                      <table border='1'>
                        <tr>
                          <th> Id </th>
                          <th> Identificación </th>
                          <th> Nombre </th>
                          <th> Apellido </th>
                          <th> Género </th>
                          <th> Eps </th>
                          <th colSpan='3'> </th>
                        </tr>  
            `;

            let bodyPacientes = [];
            for (const [i] of pacientes.entries()) {
            
             bodyPacientes[i] = `
                <tr>
                  <td> ${pacientes[i].id} </td>
                  <td> ${pacientes[i].paciente.identificacion} </td>
                  <td> ${pacientes[i].paciente.nombre} </td>
                  <td> ${pacientes[i].paciente.apellido} </td>
                  <td> ${pacientes[i].paciente.genero} </td>
                  <td> ${pacientes[i].paciente.eps} </td>
                  <td><button class='App-body-boton-vistas' onClick={()=>&#128270;</button></td>
                  <td><button class='App-body-boton-vistas' onClick={()=>&#x270D;</button></td>
                  <td><button class='App-body-boton-vistas color-rojo' onClick={()=>&#x1F7AE;</button></td>
                </tr>
            `};

            const footerPacientes = `
                  </table>
                </center>
              </div>
            `;

            contenidoPacientes.innerHTML = headerPacientes + bodyPacientes.join('') + footerPacientes;
            
      });
      return(
        <div className="App">
              <div id="contenidoPacientes">  
    
              </div>
        </div>
      )
    }
    
    export default ConsultarPacientes;