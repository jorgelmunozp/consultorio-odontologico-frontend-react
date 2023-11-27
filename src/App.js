import logo from './images/logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useFetch } from "./hooks/useFetch";
import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus} from 'react-icons/fa';
import { TbHome, TbCalendarPlus, TbCalendarSearch, TbUserSearch, TbHomeSearch, TbVirusSearch, TbUserEdit, TbHomeEdit, TbFilterEdit } from "react-icons/tb";
import Usuario from './Usuario';
import Inicio from './home';
import { ConsultarCitas } from './components/consultar/ConsultarCitas';
import { ConsultarPacientes } from './components/consultar/ConsultarPacientes';
import { ConsultarTratamientos } from './components/consultar/ConsultarTratamientos';
import { ConsultarDoctores } from './components/consultar/ConsultarDoctores';
import { ConsultarConsultorios } from './components/consultar/ConsultarConsultorios';
import { CreateCita } from './components/create/CreateCita';
import { CreatePaciente } from './components/create/CreatePaciente';
import { CreateTratamiento } from './components/create/CreateTratamiento';
import { CreateDoctor } from './components/create/CreateDoctor';
import { CreateConsultorio } from './components/create/CreateConsultorio';

function App() {
  const menuOpcion = 1;
  const [menu, setMenu] = useState(menuOpcion);

  const urlApiCitas = process.env.REACT_APP_API_CITAS;
  const citas = useFetch(urlApiCitas).data;
  let [setCitas]= useState('');

  const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
  const pacientes = useFetch(urlApiPacientes).data;
  let [setPacientes]= useState('');

  const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
  const doctores = useFetch(urlApiDoctores).data;
  let [setDoctores]= useState('');

  const urlApiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
  const consultorios  = useFetch(urlApiConsultorios).data;
  let [setConsultorios]= useState('');

  const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
  const tratamientos  = useFetch(urlApiTratamientos).data;
  let [setTratamientos]= useState('');

  const urlApiEpss = process.env.REACT_APP_API_EPSS;
  const epss  = useFetch(urlApiEpss).data;
  let [setEpss]= useState('');

  const urlApiGeneros = process.env.REACT_APP_API_GENEROS;
  const generos  = useFetch(urlApiGeneros).data;
  let [setGeneros]= useState('');

  return (
    <div className="App">
      <header className="App-header">
        <table className='App-slogan'>
          <tbody>
            <tr>
              <td><img src={logo} className="App-logo" alt="🦷" /></td>
              <td><h3 className='App-Title'>Consultorio Odontológico</h3></td>
            </tr>
          </tbody>
        </table>
      </header>
      <aside className='App-aside'>
        <nav>
          <button className="App-menu-item" onClick={()=>{setMenu(1); <Inicio/>}}><TbHome className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaCalendarPlus className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(2); <ConsultarCitas/>}}><TbCalendarSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(3); <CreateCita/>}}><TbCalendarPlus className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaUserInjured className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(4); <ConsultarPacientes/>}}><TbUserSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(5); <CreatePaciente/>}}><TbUserEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaStethoscope className='App-menu-icono2'/> </span>
          <button className="App-menu-item" onClick={()=>{setMenu(6); <ConsultarTratamientos/>}}><TbVirusSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(7); <CreateTratamiento/>}}><TbFilterEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaUserMd className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(8); <ConsultarDoctores/>}}><TbUserSearch className='App-menu-icono'/> </button>
          <button className="App-menu-item" onClick={()=>{setMenu(9); <CreateDoctor/>}}><TbUserEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaClinicMedical className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(10); <ConsultarConsultorios/>}}><TbHomeSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(11); <CreateConsultorio/>}}><TbHomeEdit className='App-menu-icono'/></button>
        </nav>
      </aside>

      <body className='App-body'>
        <div className='contenidoBody'>
          <Menu menu={menu} 
                urlApiCitas={urlApiCitas} 
                urlApiPacientes={urlApiPacientes}
                urlApiTratamientos={urlApiTratamientos}
                urlApiDoctores={urlApiDoctores} 
                urlApiConsultorios={ urlApiConsultorios}  
                citas={citas} setCitas={setCitas}
                pacientes={pacientes} setPacientes={setPacientes}
                tratamientos={tratamientos} setTratamientos={setTratamientos}
                doctores={doctores} setDoctores={setDoctores}
                consultorios={consultorios} setConsultorios={setConsultorios}
                epss={epss} setEpss={setEpss}
                generos={generos} setGeneros={setGeneros}
          />
        </div>
      </body>
    </div>
  );
}

const Menu = ({menu,urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,citas,setCitas,pacientes,setPacientes,tratamientos,setTratamientos,doctores,setDoctores,consultorios,setConsultorios,epss,setEpss,generos,setGeneros}) => {        //Componente para elegir juego a renderizar
  if(menu === 1){
    return <Inicio />;
  }else if(menu === 2){
    return <ConsultarCitas urlApiCitas={urlApiCitas} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 3){
    return <CreateCita urlApiCitas={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 4){
    return <ConsultarPacientes urlApiPacientes={urlApiPacientes} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} epss={epss} generos={generos} />;
  }else if(menu === 5){
    return <CreatePaciente urlApiPacientes={urlApiPacientes} epss={epss} generos={generos} />;
  }else if(menu === 6){
    return <ConsultarTratamientos urlApiTratamientos={urlApiTratamientos} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 7){
    return <CreateTratamiento urlApiTratamientos={urlApiTratamientos} consultorios={consultorios} doctores={doctores} />;
  }else if(menu === 8){
    return <ConsultarDoctores urlApiDoctores={urlApiDoctores} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios}/>;
  }else if(menu === 9){
    return <CreateDoctor urlApiDoctores={urlApiDoctores} tratamientos={tratamientos} />;
  }else if(menu === 10){
    return <ConsultarConsultorios urlApiConsultorios={urlApiConsultorios} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios}/>;
  }else if(menu === 11){
    return <CreateConsultorio urlApiConsultorios={urlApiConsultorios} consultorios={consultorios} />;
  }else if(menu === 14){
    return <Usuario />;
}
}

export default App;
