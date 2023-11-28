export const fetchRead = ( urlApi ) => {
  fetch(urlApi, {
    method: "GET",
    headers: { "Content-type": "application/json" }
  }).then((response) => {
    response.json();
    if(200 <= response.status && response.status <= 299){
      console.log(response.status +' GET exitoso')
    } else if(400 <= response.status && response.status <= 499){
      console.log(response.status +' GET fallido: ' + 'Error en el envío de datos')
    } else if(500 <= response.status && response.status <= 599){
      console.log(response.status +' GET fallido: ' + 'Error en el servidor remoto')
    }
    return response.status;
  }).catch((error) => {
    const errorMessage = error.toString().split(':')[1].trim();
    if(errorMessage === 'Failed to fetch') {
      console.log('GET fallido: ' + 'No hay conexión con la base de datos');
    } else {
      console.log('GET fallido: ' + errorMessage);
    }     
  });
  
}