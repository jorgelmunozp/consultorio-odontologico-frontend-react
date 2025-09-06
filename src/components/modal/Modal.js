import './modal.css';
import { useEffect } from 'react';

export const Modal = ({ Icon, iconColor='#000', title='', open=true, setOpen, content='', buttons=1, fontFamily='', theme }) => {
  useEffect(() => {                                               // Add or remove 'noScroll' class from body when modal open state changes
    const body = document.getElementById('body');
    if (open) { body && body.classList.add('noScroll'); } 
    else { body && body.classList.remove('noScroll'); }
    
    return () => { body && body.classList.remove('noScroll'); };  // Cleanup in case component unmounts while open
  }, [open]);
  
  const handleClose = () => {                                     // Close the alert
    setOpen(false);
    document.getElementById('body').classList.remove('noScroll');
  }
    
  return (
    <>
      {
        open !== false && <>
                  <div className={fontFamily + ' modalContainer justify-items-center justify-content-center'}>
                    <div id={'modalBox'} className={'modalBox'} data-theme={theme}>
                      <div className={'modalHeader'}>
                        <center><Icon color={iconColor} height={4.5} width={4.5} className={'bounce center mt-4'} /></center>
                        <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
                      </div>
                      { content ? <div className={'modalContent'}><center><h4>{ content }</h4></center></div>
                                : ''
                      }
                      <div className={'modalFooter justify-items-center'}>
                        <div className={'mt-4'}>
                            {   buttons === 1 ? <button className={'aceptBtn w-100'} onClick={ handleClose }>Aceptar</button>
                              : buttons === 2 ? <><button className={'aceptBtn w-100'} onClick={ handleClose }>Aceptar</button> <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancelar</button></>
                              : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={'darkBackground'} onClick={ handleClose }></div>
                </>
      }
    </>
  )
};
export default Modal;