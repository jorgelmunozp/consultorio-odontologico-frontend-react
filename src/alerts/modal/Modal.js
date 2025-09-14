import './modal.css';
import { memo, useEffect, useCallback, useMemo } from 'react';
import { useThemeContext } from "../../theme/ThemeContext.js";

export const Modal = memo( ({ Icon, iconColor='#000', title='', open=true, setOpen, content='', buttons=1, fontFamily='' }) => {
  const { theme } = useThemeContext();                  // 👈 Call the global theme
  
  // 👇 Memoriza función para que no se recree en cada render
  const handleClose = useCallback(() => {
    setOpen(false);
    document.body.classList.remove("noScroll");
  }, [setOpen]);

  // 👇 Bloquea scroll cuando está abierto
  useEffect(() => {                                    // Add or remove 'noScroll' class from body when modal open state changes
    const body = document.body;
    if (open) body.classList.add('noScroll'); 
    else body.classList.remove('noScroll');
    return () => body.classList.remove('noScroll');    // Cleanup in case component unmounts while open
  }, [open]);

  // 👇 Memoriza el contenido para evitar re-render innecesario
  const modalContent = useMemo(() => (
      <div className={fontFamily + " modalContainer justify-items-center justify-content-center"}>
        <div className="modalBox" data-theme={theme}>
          <div className="modalHeader">
            <center><Icon color={iconColor} height={4.5} width={4.5} className="bounce center mt-4" /></center>
            <h3 className="modalTitle main-color pt-3">{title}</h3>
          </div>

          {/* 👇 Solo renderiza contenido si existe */}
          { content && ( <div className="modalContent"><center><h4>{content}</h4></center></div> ) }

          <div className="modalFooter justify-items-center">
            <div className="mt-4">
              {/* 👇 Render condicional para botones */}
              { buttons === 1 ? ( <button className="aceptBtn w-100" onClick={handleClose} aria-label="Aceptar">Aceptar</button> ) 
              : buttons === 2 ? ( <><button className="aceptBtn w-100" onClick={handleClose} aria-label="Aceptar">Aceptar</button><button className="cancelBtn w-100" onClick={handleClose} aria-label="Cancelar">Cancelar</button></> ) 
              : null}
            </div>
          </div>
        </div>
      </div>
    ),
    [iconColor, title, content, buttons, fontFamily, theme, handleClose]
  );

  if (!open) return null;                             // 👈 Evita render si está cerrado
  
  return (
    <>
      { open && ( <>                                  {/* 👈 Solo renderiza si está abierto */}
                    { modalContent }
                    <div className="darkBackground" onClick={handleClose}></div>
                  </> )
      }
    </>
  );
} );

export default Modal;