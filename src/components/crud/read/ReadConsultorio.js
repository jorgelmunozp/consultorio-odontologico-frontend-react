import '../../modal/modal.css';
import { Logo } from '../../icons/logo/Logo';
import { myColor } from '../../../global';

export const ReadConsultorio = ({ item, title, buttons, setOpen }) => {
    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Logo color={myColor} height={4} width={4} strokeWidth={0.5} className={'center'} /></center>
                <h4 className={'modalTitle main-color'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="swalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                      <tr><td> Código </td><td>{ item.id }</td></tr>
                      <tr><td> Número </td><td>{ item.consultorio.numero }</td></tr>
                      <tr><td> Nombre </td><td>{ item.consultorio.nombre }</td></tr>
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                    {
                        buttons === 1 ? <button className={'aceptBtn'} onClick={(event) => setOpen(false)}>Aceptar</button>
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
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};