import logo from './assets/images/logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetch } from "./hooks/useFetch";
import { Logo } from './components/icons/logo/Logo';
import { Home } from './components/icons/home/Home';
import { FaUserMd,FaUserInjured,FaStethoscope,FaClinicMedical,FaCalendarPlus} from 'react-icons/fa';
import { TbHome, TbCalendarPlus, TbCalendarSearch, TbUserSearch, TbHomeSearch, TbVirusSearch, TbFilterSearch, TbUserPlus, TbHomePlus, TbFilterPlus, TbUserEdit, TbHomeEdit, TbFilterEdit } from "react-icons/tb";
import { Inicio } from './home';
import { ConsultarCitas } from './components/crud/consultar/ConsultarCitas';
import { ConsultarPacientes } from './components/crud/consultar/ConsultarPacientes';
import { ConsultarTratamientos } from './components/crud/consultar/ConsultarTratamientos';
import { ConsultarDoctores } from './components/crud/consultar/ConsultarDoctores';
import { ConsultarConsultorios } from './components/crud/consultar/ConsultarConsultorios';
import { CreateCita } from './components/crud/create/CreateCita';
import { CreatePaciente } from './components/crud/create/CreatePaciente';
import { CreateTratamiento } from './components/crud/create/CreateTratamiento';
import { CreateDoctor } from './components/crud/create/CreateDoctor';
import { CreateConsultorio } from './components/crud/create/CreateConsultorio';

function App() {
  const myColor = '#5285c5';
  const myTitle = 'Consultorio Odontológico';
  const iconSize = 20;

  const menuOpcion = 1;
  const [menu, setMenu] = useState(menuOpcion);

  const urlApiCitas = process.env.REACT_APP_API_CITAS;
  const citas = useFetch(urlApiCitas).data;
  let [setCitas] = useState('');

  const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
  const pacientes = useFetch(urlApiPacientes).data;
  let [setPacientes] = useState('');

  const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
  const doctores = useFetch(urlApiDoctores).data;
  let [setDoctores] = useState('');

  const urlApiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
  const consultorios = useFetch(urlApiConsultorios).data;
  let [setConsultorios] = useState('');

  const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
  const tratamientos = useFetch(urlApiTratamientos).data;
  let [setTratamientos] = useState('');

  const urlApiEpss = process.env.REACT_APP_API_EPSS;
  const epss = useFetch(urlApiEpss).data;
  let [setEpss] = useState('');

  const urlApiGeneros = process.env.REACT_APP_API_GENEROS;
  const generos  = useFetch(urlApiGeneros).data;
  let [setGeneros] = useState('');

  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  return (
    <div className="App user-select-none">
      <header className="fixed-top shadow-lg">
        <nav id="navbar" className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg">
          <div className="container-fluid">
            {/* <NavLink className={'active navbar-brand nav-item nav-link'}  to={"/" + urlBaseFrontend + "/index"}><Logo color={myColor} /> <span className='main-color'>{ myTitle }</span></NavLink> */}
            <a className={'navbar-brand nav-item nav-link'} href={"/" + urlBaseFrontend + "/index"}><Logo color={myColor} /> <span className='main-color fs-sm-2'>{ myTitle }</span></a>
            <button className="btn btn-light main-color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody"><Home color={myColor} height={1.5} width={1.5}/></button>
          </div>
        </nav>
      </header>
      <aside className='float-start pt-5'>
        <nav className="navbar bg-light">

{/* <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasBody" role="button" aria-controls="offcanvasBody">
  ⌂
</a> */}
{/* <button className="btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody">
  ⌂
</button> */}
<div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasBody" aria-labelledby="offcanvasBodyLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasBodyLabel">⌂</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <ul className="navbar-nav">
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(1); <Inicio/>}}><TbHome size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <span className="nav-link"><FaCalendarPlus size={iconSize} className=' main-color'/></span>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(2); <ConsultarCitas/>}}><TbCalendarSearch size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(3); <CreateCita/>}}><TbCalendarPlus size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <span className="nav-link"><FaUserInjured size={iconSize} className=' main-color'/></span>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(4); <ConsultarPacientes/>}}><TbUserSearch size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(5); <CreatePaciente/>}}><TbUserPlus size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <span className="nav-link"><FaStethoscope size={iconSize} className=' main-color'/> </span>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(6); <ConsultarTratamientos/>}}><TbFilterSearch size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(7); <CreateTratamiento/>}}><TbFilterPlus size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <span className="nav-link"><FaUserMd size={iconSize} className=' main-color'/></span>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(8); <ConsultarDoctores/>}}><TbUserSearch size={iconSize} className='text-secondary main-color-hover'/> </button>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(9); <CreateDoctor/>}}><TbUserPlus size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <span className="nav-link"><FaClinicMedical size={iconSize} className=' main-color'/></span>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(10); <ConsultarConsultorios/>}}><TbHomeSearch size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
      <li className="nav-item">
        <button className="nav-link" onClick={()=>{setMenu(11); <CreateConsultorio/>}}><TbHomePlus size={iconSize} className='text-secondary main-color-hover'/></button>
      </li>
    </ul>
  </div>
</div>

          {/* <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(1); <Inicio/>}}><TbHome size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <span className="nav-link"><FaCalendarPlus size={iconSize} className=' main-color'/></span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(2); <ConsultarCitas/>}}><TbCalendarSearch size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(3); <CreateCita/>}}><TbCalendarPlus size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <span className="nav-link"><FaUserInjured size={iconSize} className=' main-color'/></span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(4); <ConsultarPacientes/>}}><TbUserSearch size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(5); <CreatePaciente/>}}><TbUserPlus size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <span className="nav-link"><FaStethoscope size={iconSize} className=' main-color'/> </span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(6); <ConsultarTratamientos/>}}><TbFilterSearch size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(7); <CreateTratamiento/>}}><TbFilterPlus size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <span className="nav-link"><FaUserMd size={iconSize} className=' main-color'/></span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(8); <ConsultarDoctores/>}}><TbUserSearch size={iconSize} className='text-secondary main-color-hover'/> </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(9); <CreateDoctor/>}}><TbUserPlus size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <span className="nav-link"><FaClinicMedical size={iconSize} className=' main-color'/></span>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(10); <ConsultarConsultorios/>}}><TbHomeSearch size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={()=>{setMenu(11); <CreateConsultorio/>}}><TbHomePlus size={iconSize} className='text-secondary main-color-hover'/></button>
              </li>
            </ul>
          </div> */}
        </nav>

      </aside>
      <body className='App-body d-flex bg-white pt-5'>
        <div id='contenidoBody' className='contenidoBody mx-auto'>
          <div id="App" className="App"> 
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
        </div>
      </body>
    </div>
  );
}

const Menu = ({menu,urlApiCitas,urlApiPacientes,urlApiTratamientos,urlApiDoctores,urlApiConsultorios,citas,setCitas,pacientes,setPacientes,tratamientos,setTratamientos,doctores,setDoctores,consultorios,setConsultorios,epss,setEpss,generos,setGeneros}) => {        //Componente para elegir juego a renderizar
  if(menu === 1){
    return <Inicio />;
  }else if(menu === 2){
    return <ConsultarCitas urlApiCitas={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 3){
    return <CreateCita urlApiCitas={urlApiCitas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 4){
    return <ConsultarPacientes urlApiPacientes={urlApiPacientes} citas={citas} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} epss={epss} generos={generos} />;
  }else if(menu === 5){
    return <CreatePaciente urlApiPacientes={urlApiPacientes} epss={epss} generos={generos} />;
  }else if(menu === 6){
    return <ConsultarTratamientos urlApiTratamientos={urlApiTratamientos} citas={citas} pacientes={pacientes} doctores={doctores} consultorios={consultorios} />;
  }else if(menu === 7){
    return <CreateTratamiento urlApiTratamientos={urlApiTratamientos} consultorios={consultorios} doctores={doctores} />;
  }else if(menu === 8){
    return <ConsultarDoctores urlApiDoctores={urlApiDoctores} citas={citas} pacientes={pacientes} tratamientos={tratamientos} consultorios={consultorios} />;
  }else if(menu === 9){
    return <CreateDoctor urlApiDoctores={urlApiDoctores} tratamientos={tratamientos} />;
  }else if(menu === 10){
    return <ConsultarConsultorios urlApiConsultorios={urlApiConsultorios} citas={citas} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} />;
  }else if(menu === 11){
    return <CreateConsultorio urlApiConsultorios={urlApiConsultorios} consultorios={consultorios} />;
  }else{
    return <Inicio />;
  }
}

export default App;
