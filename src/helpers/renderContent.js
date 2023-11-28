import ReactDOM from 'react-dom/client';
import { elementRender } from '../helpers/elementRender';
import { ConsultarCitas } from '../components/consultar/ConsultarCitas';

export const renderContent = (urlApi,citas,pacientes,tratamientos,doctores,consultorios) => {
    const cloneUrlApi = urlApi;
    const api = cloneUrlApi.split('/').pop();
    console.log(api)
    console.log(urlApi)
    let root;
    if ( api === "citas") {
        root = ReactDOM.createRoot(document.getElementById('contenidoCitas'));
    } else if ( api === "pacientes") {
        root = ReactDOM.createRoot(document.getElementById('contenidoPacientes'));
    } else if ( api === "tratamientos") {
        root = ReactDOM.createRoot(document.getElementById('contenidoTratamientos'));
    } else if ( api === "doctores") {
        root = ReactDOM.createRoot(document.getElementById('contenidoDoctores'));
    } else if ( api === "consultorios") {
        root = ReactDOM.createRoot(document.getElementById('contenidoConsultorios'));
    }

    // root.render(elementRender(urlApi,citas,pacientes,tratamientos,doctores,consultorios,api==="pacientes" ? epss : '',api==="pacientes" ? generos : ''));
    root.render(elementRender(urlApi,citas,pacientes,tratamientos,doctores,consultorios));
}