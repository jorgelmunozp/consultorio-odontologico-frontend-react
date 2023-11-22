export const guardarFetch = ( urlApi,contenidoApi,setAlertMessage ) => {
    fetch(urlApi, {
      method: "POST",
      body: eval(contenidoApi),
      headers: { "Content-type": "application/json" }
    }).then((response) => {
      response.json();
      if(200 <= response.status && response.status <= 299){
        console.log(response.status +' Registro exitoso')
        setAlertMessage('Registro exitoso');
      } else if(400 <= response.status && response.status <= 499){
        console.log(response.status +' Registro fallido: ' + 'Error en el envío de datos')
        setAlertMessage('Registro fallido: ' + 'Error en envío de datos');
      } else if(500 <= response.status && response.status <= 599){
        console.log(response.status +' Registro fallido: ' + 'Error en el servidor remoto')
        setAlertMessage('Registro fallido: ' + 'Error en servidor remoto');
      }
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        console.log(error.status +' Registro fallido')
        setAlertMessage('Registro fallido: ' + 'No hay conexión con la base de datos');
      } else {
        setAlertMessage('Registro fallido: ' + errorMessage);
      }     
    });
  }