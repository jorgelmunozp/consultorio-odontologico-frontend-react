import React from 'react'
import { Button } from '@mui/material';
import { GuardarFetch } from './GuardarFetch';


export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setAlertMessage }) => {
  return (
        <Button
            variant="contained"
            className="button"
            size="large"
            onClick={ () => GuardarFetch(urlApi,contenidoApi,setAlertMessage) }
            endIcon={ endIcon }
        >
            {titulo}{" "}
        </Button>
  )
}
