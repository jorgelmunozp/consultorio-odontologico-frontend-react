export const fetchCreate = ( urlApi,contenidoApi,setResponseStatus,createFlag ) => {
  if(createFlag === true){
    fetch(urlApi, {
      method: "POST",
      body: eval(contenidoApi),
      headers: { "Content-type": "application/json" }
    }).then((response) => {
      response.json();
      if(200 <= response.status && response.status <= 299){
        console.log('POST ' + response.status + ' Registro exitoso')
        setResponseStatus(response.status);
      } else if(400 <= response.status && response.status <= 499){
        console.log('POST ' + response.status + ' Registro fallido: ' + 'Error en el envío de datos')
        setResponseStatus(response.status);
      } else if(500 <= response.status && response.status <= 599){
        console.log('POST ' + response.status + ' Registro fallido: ' + 'Error en el servidor remoto')
        setResponseStatus(response.status);
      }
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        console.log(error.status +' Registro fallido')
        setResponseStatus('Registro fallido: ' + 'No hay conexión con la base de datos');
      } else {
        setResponseStatus('Registro fallido: ' + errorMessage);
      }     
    });
  }
}