import './modal.css';

export const Modal = ({ Icon, iconColor, setOpen, title, content, buttons }) => {
    document.getElementById('body').classList.add('noScroll');

    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={iconColor} height={5.5} width={5.5} className={'modalIcon center mt-4'} /></center>
                <h3 className={'modalTitle main-color pt-3'}>{title}</h3>
              </div>
                {
                  content ? <div className={'modalContent'}>
                              <center>
                                <h3>{content}</h3>
                              </center>
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
      )
};