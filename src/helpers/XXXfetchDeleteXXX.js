export const fetchDelete = ( urlApi,id ) => {
    fetch(urlApi + "/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    }).then((response) => {
      response.json();
      console.log('DELETE ' + response.status + ' Registro eliminado');
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        console.log('Eliminación fallida: ' + 'No hay conexión con la base de datos');
      } else {
        console.log('Eliminación fallida: ' + errorMessage);
      }     
    });
  }