export const editarFetch = ( urlApi,contenidoApi,citaId ) => {
    fetch(urlApi + "/" + citaId, {
      method: "PUT",
      body: eval(contenidoApi),
      headers: { "Content-type": "application/json" }
    }).then((response) => {
      response.json();
      // setAlertMessage('Registro actualizado con éxito');
      console.log('Registro actualizado con éxito');
      console.log(response);
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        // setAlertMessage('Registro fallido: ' + 'No hay conexión con la base de datos');
        console.log('Registro fallido: ' + 'No hay conexión con la base de datos');
      } else {
        // setAlertMessage('Registro fallido: ' + errorMessage);
        console.log('Registro fallido: ' + errorMessage);
      }     
    });
  }