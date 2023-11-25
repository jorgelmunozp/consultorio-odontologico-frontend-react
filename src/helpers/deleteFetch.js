export const deleteFetch = ( urlApi,citaId ) => {
    fetch(urlApi + "/" + citaId, {
      method: "DELETE",
      body: "",
      headers: { "Content-type": "application/json" }
    }).then((response) => {
      response.json();
      console.log('Registro eliminado con éxito');
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        // setResponseStatus('Registro fallido: ' + 'No hay conexión con la base de datos');
        console.log('Eliminación fallida: ' + 'No hay conexión con la base de datos');
      } else {
        // setResponseStatus('Registro fallido: ' + errorMessage);
        console.log('Eliminación fallida: ' + errorMessage);
      }     
    });
  }