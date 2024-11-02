import './modal.css';
import { Success } from '../icons/success/Success';
import { Warning } from '../icons/warning/Warning';
import { Error } from '../icons/error/Error';

export const Modal = ({ open, setOpen, content='', buttons=1 }) => {
    { open !== false && document.getElementById('body').classList.add('noScroll') }
    
    let Icon = '';
    let iconColor = '';
    let title = '';
    switch (open) { 
      case 'successCreate': Icon=Success; iconColor='#0f0'; title='Registro exitoso'; break;
      case 'successUpdate': Icon=Success; iconColor='#0f0'; title='Actualización exitosa'; break;
      case 'successDelete': Icon=Success; iconColor='#0f0'; title='Eliminación exitosa'; break;
      case 'warning': Icon=Warning; iconColor='#f8bb86'; title='Warning'; break;
      case 'errorCreate': Icon=Error; iconColor='#f00'; title='Datos no Registrados'; break;
      case 'errorUpdate': Icon=Error; iconColor='#f00'; title='Datos no Actualizados'; break;
      case 'errorDelete': Icon=Error; iconColor='#f00'; title='Datos no Eliminados'; break;
      case 'errorFetch': Icon=Error; iconColor='#f00'; title='Error en la conexión con el servidor'; break;
    }

    return (
        <>
          {
            open !== false && <>
                      <div className={'modalContainer justify-items-center justify-content-center'}>
                        <div className={'modalBox'}>
                          <div className={'modalHeader'}>
                            <center><Icon color={iconColor} height={4.5} width={4.5} className={'bounce center mt-4'} /></center>
                            <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
                          </div>
                          { content ? <div className={'modalContent'}><center><h3>{ content }</h3></center></div>
                                    : ''
                          }
                          <div className={'modalFooter'}>
                            <div className={'d-grid mt-4'}>
                                {   buttons === 1 ? <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
                                  : buttons === 2 ? <><button className={'aceptBtn w-100'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button> <button className={'cancelBtn w-100'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Cancel</button></>
                                  : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
                    </>
          }
        </>
      )
};