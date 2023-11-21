import React from 'react'
import { Button } from '@mui/material';
import { guardarFetch } from '../../helpers/GuardarFetch';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setAlertMessage }) => {
  console.log("BotonGuardar urlApi: ", urlApi);

  return (
        <Button
            variant="contained"
            className="button"
            size="large"
            onClick={ () => guardarFetch(urlApi,contenidoApi,setAlertMessage) }
            endIcon={ endIcon }
        >
            {titulo}{" "}
        </Button>
  )
}
