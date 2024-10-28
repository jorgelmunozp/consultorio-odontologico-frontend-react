import './modal.css';
import { Success } from '../icons/success/Success';
import { Warning } from '../icons/warning/Warning';
import { Error } from '../icons/error/Error';

export const Modal = ({ type, open, setOpen, title='', content='', buttons=1 }) => {
    document.getElementById('body').classList.add('noScroll');
    
    let Icon = '';
    let iconColor = '';
    switch (type) { 
      case 'success' : Icon = Success; iconColor = '#0f0'; break;
      case 'warning': Icon = Warning; iconColor = '#f8bb86'; break;
      case 'error': Icon = Error; iconColor = '#f00'; break;
    }

    return (
        <>
          {
            open === 'success' &&
            <>
              <div className={'modalContainer'}>
                <div className={'modalBox'}>
                  <div className={'modalHeader'}>
                    <center><Icon color={iconColor} height={5.5} width={5.5} className={'modalIcon center mt-4'} /></center>
                    <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
                  </div>
                    {
                      content ? <div className={'modalContent'}>
                                  <center><h3>{ content }</h3></center>
                                </div>
                              : ''
                    }
                  <div className={'modalFooter'}>
                    <div className={'modalButtons'}>
                        {
                            buttons === 1 ? <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
                          : buttons === 2 ? <>
                                              <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
                                              <button className={'cancelBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Cancel</button>
                                            </>
                          : ""
                        }
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