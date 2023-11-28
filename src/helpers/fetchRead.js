export const fetchRead = async ( urlApi ) => {
  try {
    const response = await fetch(urlApi, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    });
    response.json();
    if(200 <= response.status && response.status <= 299){
      console.log('GET ' + response.status +' Consulta exitosa')
    } else if(400 <= response.status && response.status <= 499){
      console.log('GET ' + response.status +' Consulta fallida: ' + 'Error en el envío de datos')
    } else if(500 <= response.status && response.status <= 599){
      console.log('GET ' + response.status +' Consulta fallida: ' + 'Error en el servidor remoto')
    }
    return response.status;
  } catch(error) {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        console.log('GET fallido: ' + 'No hay conexión con la base de datos');
      } else {
        console.log('GET fallido: ' + errorMessage);
      }     
    }
}