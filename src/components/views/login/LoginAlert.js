import { lazy, useState } from 'react'
import { getDate } from '../../../helpers/getDate.js';
import { getTime } from '../../../helpers/getTime.js';

const Error = lazy(() => import('../../icons/alert/Error.js'));
const Warning = lazy(() => import('../../icons/alert/Warning.js'));

export const LoginAlert = ({ Logo, user, alertMessage, alertType, theme }) => {
    let fecha = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
    let hora = useState(getTime);

    return (
        <div id="loginAlert" className="modal fade" tabIndex="-1" aria-labelledby="loginAlertLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-modalContainer" data-theme={theme}>
                <div className="modal-content bg-transparent">
                    <div className="modal-body mt-5 mx-auto w-100 pt-1 text-center">
                        { 
                            ( user.logged ) 
                                ?   <>
                                        <button type="button" className="border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close">
                                            <Logo strokeWidth={1} height={1.5} width={1.5} data-bs-dismiss="modal" className="main-color fs-5" />
                                        </button>
                                        <div className="container">
                                            <p className="mt-4">Fecha: { fecha } Hora: { hora }</p>
                                            <p className="mt-4">Agenda del día</p>
                                        </div>
                                    </>
                                : ( alertType === "warning" )
                                    ? <Warning color={"#ffc107"} height={5} width={5} strokeWidth={0}/> 
                                    : <Error color={"#dc3545"} height={5} width={5} strokeWidth={0}/>
                        }
                        <p className='mt-3 pb-4'>{ user.logged ? '' : alertMessage }</p>
                        {
                            ( user.logged )
                            ?   <>
                                    <button type="button" className="btn btn-login mb-3 p-3 w-100 shadow-sm" data-bs-dismiss="modal">Aceptar</button>
                                </>
                            :   <div className='container pb-3'>
                                    <button className='btn btn-login my-1 p-3 w-100 shadow-sm' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#login" aria-controls="modalBody">Reintentar</button>
                                    <button type="button" className="btn btn-outline-danger p-3 w-100 shadow-sm" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}
export default LoginAlert;