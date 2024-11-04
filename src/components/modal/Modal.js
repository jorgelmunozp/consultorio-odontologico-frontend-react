import './modal.css';

export const Modal = ({ Icon, iconColor, title, open, setOpen, content='', buttons=1 }) => {
    { open !== false && document.getElementById('root').classList.add('noScroll') }
    
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
                        <div className={'modalFooter justify-items-center'}>
                          <div className={'mt-4'}>
                              {   buttons === 1 ? <button className={'aceptBtn w-100'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
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