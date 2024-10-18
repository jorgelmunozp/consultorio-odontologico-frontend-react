import './modal.css';
import { myColor } from '../../global';

export const Modal = ({ Icon, setOpen, title, content, buttons }) => {
    return (
        <>
          <div className={'darkBackground'} onClick={() => setOpen(false)} >
            <div className={'centered'}>
              <div className={'modalBox'}>
                <div className={'modalHeader'}>
                  <center><Icon color={myColor} height={2} width={2} className={'center'} /></center>
                  <h4 className={'heading main-color'}>{title}</h4>
                </div>
                <div className={'modalContent'}>
                  <center>
                    <h3>{content}</h3>
                  </center>
                </div>
                <div className={'modalActions'}>
                  <div className={'actionsContainer'}>
                      {
                          buttons === 1 ? <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                        : buttons === 2 ? <>
                                            <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                                            <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                                          </>
                        : ""
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
};