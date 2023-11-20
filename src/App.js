import logo from './images/logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useFetch } from "./hooks/useFetch";

import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus} from 'react-icons/fa';
import { TbHome, TbCalendarPlus, TbCalendarSearch, TbUserSearch, TbHomeSearch, TbVirusSearch, TbUserEdit, TbHomeEdit, TbFilterEdit } from "react-icons/tb";

import Usuario from './Usuario';

import Inicio from './home';
import ConsultarCitas from './componentesConsultar/ConsultarCitas';
import ConsultarPacientes from './componentesConsultar/ConsultarPacientes';
import ConsultarTratamientos from './componentesConsultar/ConsultarTratamientos';
import ConsultarDoctores from './componentesConsultar/ConsultarDoctores';
import ConsultarConsultorios from './componentesConsultar/ConsultarConsultorios';
import RegistrarCita from './componentesRegistrar/RegistrarCita';
import RegistrarPaciente from './componentesRegistrar/RegistrarPaciente';
import RegistrarTratamiento from './componentesRegistrar/RegistrarTratamiento';
import RegistrarDoctor from './componentesRegistrar/RegistrarDoctor';
import RegistrarConsultorio from './componentesRegistrar/RegistrarConsultorio';

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
          <button className="App-menu-item" onClick={()=>{setMenu(3); <RegistrarCita/>}}><TbCalendarPlus className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaUserInjured className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(4); <ConsultarPacientes/>}}><TbUserSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(5); <RegistrarPaciente/>}}><TbUserEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaStethoscope className='App-menu-icono2'/> </span>
          <button className="App-menu-item" onClick={()=>{setMenu(6); <ConsultarTratamientos/>}}><TbVirusSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(7); <RegistrarTratamiento/>}}><TbFilterEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaUserMd className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(8); <ConsultarDoctores/>}}><TbUserSearch className='App-menu-icono'/> </button>
          <button className="App-menu-item" onClick={()=>{setMenu(9); <RegistrarDoctor/>}}><TbUserEdit className='App-menu-icono'/></button>
          <span className="App-menu-subtitulo"><FaClinicMedical className='App-menu-icono2'/></span>
          <button className="App-menu-item" onClick={()=>{setMenu(10); <ConsultarConsultorios/>}}><TbHomeSearch className='App-menu-icono'/></button>
          <button className="App-menu-item" onClick={()=>{setMenu(11); <RegistrarConsultorio/>}}><TbHomeEdit className='App-menu-icono'/></button>
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
          />
        </div>
      </body>
    </div>
  );
}


const Menu = ({menu,urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,pacientes,setPacientes,tratamientos,setTratamientos,doctores,setDoctores,consultorios,setConsultorios}) => {        //Componente para elegir juego a renderizar
  if(menu === 1){
    return <Inicio />;
  }else if(menu === 2){
    return <ConsultarCitas />;
  }else if(menu === 3){
    return <RegistrarCita urlApiCitas={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 4){
    return <ConsultarPacientes />;
  }else if(menu === 5){
    return <RegistrarPaciente urlApiPacientes={urlApiPacientes} />;
  }else if(menu === 6){
    return <ConsultarTratamientos />;
  }else if(menu === 7){
    return <RegistrarTratamiento urlApiTratamientos={urlApiTratamientos} consultorios={consultorios} doctores={doctores} />;
  }else if(menu === 8){
    return <ConsultarDoctores />;
  }else if(menu === 9){
    return <RegistrarDoctor urlApiDoctores={urlApiDoctores} />;
  }else if(menu === 10){
    return <ConsultarConsultorios />;
  }else if(menu === 11){
    return <RegistrarConsultorio urlApiConsultorios={urlApiConsultorios} />;
  }else if(menu === 14){
    return <Usuario />;
}
}


export default App;
