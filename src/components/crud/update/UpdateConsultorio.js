import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';
import { myColor } from '../../../global';

export const UpdateConsultorio = ({ Icon, item, urlApi, title, buttons, setOpen, setAlert, Row, states, handleChanges }) => {
  const object = Object.keys(item)[0];

  const handleUpdate = () => {
    if(states.filter(state => state === '').length === 0) {
      Object.keys(item[object]).forEach((parameter,index) => { item[object][parameter] = states[index] });
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
            let arrayResponse;
            await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
                .then(response => response.json())
                .then(data => arrayResponse = data);
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} />);

            setAlert('successUpdate')
          }
          else { setAlert('errorUpdate') }
        },
        function(error) { setAlert('errorUpdate') }
      )
    }
  };
 
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
                      {
                        states.map((state,index)=>{ return(
                          <tr key={index}><td>{ Object.keys(item[object])[index].charAt(0).toUpperCase() + Object.keys(item[object])[index].slice(1) }</td><td><input type="text" value={ state } onChange={ handleChanges[index] } className="modalInput"></input></td></tr>
                        )})
                      }
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                    {
                        buttons === 1 ? <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                      : buttons === 2 ? <>
                                          <button className={'aceptBtn'} onClick={() => {handleUpdate();setAlert(true);setOpen(false)}}>Actualizar</button>
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