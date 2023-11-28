export const fetchDelete = async ( urlApi,id ) => {
  try {  
    const response = await fetch(urlApi + "/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json" }
    });
    response.json();
    if (200 <= response.status && response.status <= 299) {
      console.log('DELETE ' + response.status + ' Registro eliminado');
    } else if (400 <= response.status && response.status <= 499) {
      console.log('DELETE ' + response.status + ' Eliminación fallida: ' + 'Error en el envío de datos');
    } else if (500 <= response.status && response.status <= 599) {
      console.log('DELETE ' + response.status + ' Eliminación fallida: ' + 'Error en el servidor remoto');
    }
    return response.status;
    } catch (error) {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        console.log('Eliminación fallida: ' + 'No hay conexión con la base de datos');
      } else {
        console.log('Eliminación fallida: ' + errorMessage);
      }     
    }
  }