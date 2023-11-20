const ConsultarTratamientos = ({urlApiTratamientos}) => {
    fetch(urlApiTratamientos)                 //API REST para la simulación de la tabla tratamientos de la base de datos
      .then(response => response.json())
      .then(tratamientos => {
       
          let contenidoTratamientos = document.getElementById('contenidoTratamientos');

          const headerTratamientos = `
              <div class="columnaContenido"> 
                <center>
                  <hr/>
                  <h4> Tratamientos Autorizados </h4>
                  <hr/>
                  <br/><br/>
                  <table border='1'>
                    <tr>
                      <th> N° </th>
                      <th> Tratamiento </th>
                      <th> Consultorio </th>
                      <th> Doctor </th>
                      <th> Fecha </th>
                      <th> Hora </th>
                      <th colSpan='3'> </th>
                    </tr>      
          `;

          let bodyTratamientos = [];
            for (const [i] of tratamientos.entries()) {
            
              bodyTratamientos[i] = `
                <tr>
                  <td> ${tratamientos[i].id} </td>
                  <td> ${tratamientos[i].tratamiento.tipo} </td>
                  <td> ${tratamientos[i].tratamiento.consultorio} </td>
                  <td> ${tratamientos[i].tratamiento.doctor} </td>
                  <td><button class='App-body-boton-vistas' onClick={()=>&#128270;</button></td>
                  <td><button class='App-body-boton-vistas' onClick={()=>&#x270D;</button></td>
                  <td><button class='App-body-boton-vistas color-rojo' onClick={()=>&#x1F7AE;</button></td>
                </tr>
          `};

          const footerTratamientos = `
                    </table>
                  </center>
                </div>
          `;

          contenidoTratamientos.innerHTML = headerTratamientos + bodyTratamientos.join('') + footerTratamientos; 

        });
      return(
        <div className="App">
              <div id="contenidoTratamientos">  
    
              </div>
        </div>
      )
    }
    
    export default ConsultarTratamientos;