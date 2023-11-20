const ConsultarConsultorios = ({urlApiconsultorios}) => {
    fetch(urlApiconsultorios) //API REST para la simulación de la tabla tratamientos de la base de datos
      .then((response) => response.json())
      .then((consultorios) => {

        let contenidoConsultorios = document.getElementById("contenidoConsultorios");
        
        const headerConsultorios = ` 
            <div class="columnaContenido">
            <center>
              <hr/>
              <h4> Consultorios Disponibles </h4>
              <hr/>
              <br/><br/>
              <table border='1'>
                <tr>
                  <th> N° </th>
                  <th> Número </th>
                  <th> Consultorio </th>
                  <th colSpan='3'> </th>
                </tr>  
        `;

        let bodyConsultorios = [];
        for (const [i] of consultorios.entries()) {
        
          bodyConsultorios[i] = `
            <tr>
              <td> ${consultorios[i].id} </td>
              <td> ${consultorios[i].consultorio.numero} </td>
              <td> ${consultorios[i].consultorio.nombre} </td>
              <td><button class='App-body-boton-vistas' onClick={()=>&#128270;</button></td>
              <td><button class='App-body-boton-vistas' onClick={()=>&#x270D;</button></td>
              <td><button class='App-body-boton-vistas color-rojo' onClick={()=>&#x1F7AE;</button></td>
            </tr> 
        `};

        const footerConsultorios = ` 
                </table>
              </center>
            </div>        
        `;

        contenidoConsultorios.innerHTML = headerConsultorios + bodyConsultorios.join('') + footerConsultorios;

      });
    return (
      <div className="App">
        <div id="contenidoConsultorios"></div>
      </div>
    );
  }
  
  export default ConsultarConsultorios;