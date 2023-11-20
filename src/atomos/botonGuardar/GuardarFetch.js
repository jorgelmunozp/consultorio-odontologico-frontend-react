export const GuardarFetch = ( urlApi,contenidoApi,setAlertMessage ) => {
    fetch(urlApi, {
      method: "POST",
      body: eval(contenidoApi),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      response.json();
      setAlertMessage('Registro exitoso');
    }).catch((error) => {
      const errorMessage = error.toString().split(':')[1].trim();
      if(errorMessage === 'Failed to fetch') {
        setAlertMessage('Registro fallido: ' + 'No hay conexión con la base de datos');
      } else {
        setAlertMessage('Registro fallido: ' + errorMessage);
      }     
    });
  }