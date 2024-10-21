import '../../modal/modal.css';
import { myColor } from '../../../global';

export const ReadPaciente = ({ Icon, item, title, buttons, setOpen }) => {
    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={5} width={5} strokeWidth={0.6} className={'center'} /></center>
                <h4 className={'modalTitle main-color pt-3'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                      <tr><td> Código </td><td>{ item.id }</td></tr>
                      <tr><td> Identificación </td><td>{ item.paciente.identificacion }</td></tr>
                      <tr><td> Nombre </td><td>{ item.paciente.nombre }</td></tr>
                      <tr><td> Apellido </td><td>{ item.paciente.apellido }</td></tr>
                      <tr><td> Género </td><td>{ item.paciente.genero }</td></tr>
                      <tr><td> Eps </td><td>{ item.paciente.eps }</td></tr>
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