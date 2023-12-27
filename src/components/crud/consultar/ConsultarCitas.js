import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';
import { SortingCitasBar } from '../../sort/SortingCitasBar';

const ElementRender = (urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) =>  { 
  /* Query */
  let query = '';
  const inmueblesFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(inmueblesFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : inmueblesFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página

  let indexPages = [];
  let activePage = [true];                                            // [true]
  if(resPages !== 0 ){
    for(let i = 0; i <= numPages; i++) { 
      indexPages.push(i);                                             // [0,1,2,3]
      if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
    }
  } else if(resPages === 0 ){
    for(let i = 0; i < numPages; i++) { 
      indexPages.push(i);                                             // [0,1,2,3]
      if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
    }
  }

  const [activePages, setActivePages] = useState(activePage);         // [true,false,false,false]

  
  /* Sort */
  const [sortBy, setSortBy] = useState(0);
  function sortByIdUp(a, b) { return a.id - b.id; }
  function sortByIdDown(a, b) { return b.id - a.id; }
  function sortByPatientUp(a, b) { return a.cita.paciente.localeCompare(b.cita.paciente); }
  function sortByPatientDown(a, b) { return b.cita.paciente.localeCompare(a.cita.paciente); }
  function sortByDateUp(a, b) { return a.cita.fecha.localeCompare(b.cita.fecha); }
  function sortByDateDown(a, b) { return b.cita.fecha.localeCompare(a.cita.fecha); }
  function sortByTimeUp(a, b) { return a.cita.hora.localeCompare(b.cita.hora); }
  function sortByTimeDown(a, b) { return b.cita.hora.localeCompare(a.cita.hora); }
  function sortByConsultingRoomUp(a, b) { return a.cita.consultorio.localeCompare(b.cita.consultorio); }
  function sortByConsultingRoomDown(a, b) { return b.cita.consultorio.localeCompare(a.cita.consultorio); }
  function sortByDoctorUp(a, b) { return a.cita.doctor.localeCompare(b.cita.doctor); }
  function sortByDoctorDown(a, b) { return b.cita.doctor.localeCompare(a.cita.doctor); }
  function sortByTreatmentUp(a, b) { return a.cita.tratamiento.localeCompare(b.cita.tratamiento); }
  function sortByTreatmentDown(a, b) { return b.cita.tratamiento.localeCompare(a.cita.tratamiento); }

  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2'> Citas Registradas</h5>
      <br/><br/>
      {/* <div className='container-fluid overflow-scroll'> */}
      <div className='container-fluid overflow-auto'>
        {/* <div className='row flex-nowrap bg-main-color text-white border'> */}

          {/* <div className='col-3 col-md-1'>
            <small className='row flex-nowrap align-items-center justify-content-around'>
              <div className='col'><span className=''>Código</span></div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","id",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","id",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>
          </div>

          <div className='col-4 col-md-2'>
            <small className='row flex-nowrap align-items-center justify-content-around'>
              <div className='col-1'><span className=''>Paciente</span></div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","paciente",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","paciente",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>
          
          <div className='col-4 col-md-2'>
            <small className='row flex-nowrap align-items-center justify-content-around'>
              <div className='col'><span className=''>Fecha</span></div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","fecha",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","fecha",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>

          <div className='col-2 col-md-1'>
            <small className='row flex-nowrap align-items-center  justify-content-around'>
              <div className='col'><span className='justify-content-center'>Hora</span></div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","hora",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","hora",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>

          <div className='col-2 col-md-1'>
            <small className='row flex-nowrap align-items-center  justify-content-around'>
              <div className='col'>Consultorio</div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","consultorio",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","consultorio",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>

          <div className='col-4 col-md-2'>
            <small className='row flex-nowrap align-items-center  justify-content-around'>
              <div className='col'>Médico</div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","doctor",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","doctor",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>
          
          <div className='col-4 col-md-2'>
            <small className='row flex-nowrap align-items-center  justify-content-around'>
              <div className='col'>Tratamiento</div>
              <div className='col-1'>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("up","tratamiento",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-2 px-0'>
                    <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>HandleSortBy("down","tratamiento",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button>
                  </div>
                </div>
              </div>
            </small>   
          </div>
        </div> */}
        <SortingCitasBar setSortBy={setSortBy} Arrows={Arrows} />
        {
          citas.sort(sortBy === 1 ? sortByIdUp 
                      : ( sortBy === 2 ? sortByIdDown 
                        : ( sortBy === 3 ? sortByPatientUp 
                          : ( sortBy === 4 ? sortByPatientDown 
                            : ( sortBy === 5 ? sortByDateUp 
                              : ( sortBy === 6 ? sortByDateDown 
                                : ( sortBy === 7 ? sortByTimeUp 
                                  : ( sortBy === 8 ? sortByTimeDown 
                                    : ( sortBy === 9 ? sortByConsultingRoomUp 
                                      : ( sortBy === 10 ? sortByConsultingRoomDown 
                                        : ( sortBy === 11 ? sortByDoctorUp 
                                          : ( sortBy === 12 ? sortByDoctorDown 
                                            : ( sortBy === 13 ? sortByTreatmentUp 
                                              : ( sortBy === 14 ? sortByTreatmentDown 
                                                : sortByIdUp
                 )))))))))))))).slice(indexPage[0],indexPage[1]).map( cita => (
            <div className='row flex-nowrap border row-color py-2' key={ cita.id }>
              <div className='col-3 col-md-1'>{ cita.id }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.paciente }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.fecha }</div>
              <div className='col-2 col-md-1 text-nowrap'>{ cita.cita.hora }</div>
              <div className='col-2 col-md-1 text-nowrap'>{ cita.cita.consultorio }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.doctor }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.tratamiento }</div>
              <div className='col-6 col-md-2'>
                <div className='row flex-nowrap bg-transparent'>
                  <div className='col-auto'><button className='col App-body-boton-vistas' onClick={ () => ReadCita(cita) }>&#128270;</button></div>
                  <div className='col-auto'><button className='col App-body-boton-vistas' onClick={ () => UpdateCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></div>
                  <div className='col-auto'><button className='col App-body-boton-vistas color-rojo' onClick={ () => DeleteCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <PaginationBar query={query} array={citas} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>  
  )};

const HandleSortBy = (dir,parameter,urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      citas.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="paciente") { 
      citas.sort((a, b) => (a.cita.paciente > b.cita.paciente) ? 1 : -1); 
    } else if(parameter==="fecha") {
      citas.sort((a, b) => (a.cita.fecha > b.cita.fecha) ? 1 : -1);
    } else if(parameter==="hora") {
      citas.sort((a, b) => (a.cita.hora > b.cita.hora) ? 1 : -1);
    } else if(parameter==="consultorio") { 
      citas.sort((a, b) => (a.cita.consultorio > b.cita.consultorio) ? 1 : -1);
    } else if(parameter==="doctor") { 
      citas.sort((a, b) => (a.cita.doctor > b.cita.doctor) ? 1 : -1);
    } else if(parameter==="tratamiento") { 
      citas.sort((a, b) => (a.cita.tratamiento > b.cita.tratamiento) ? 1 : -1);
    }
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      citas.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="paciente") { 
      citas.sort((a, b) => (a.cita.paciente < b.cita.paciente) ? 1 : -1); 
    } else if(parameter==="fecha") {
      citas.sort((a, b) => (a.cita.fecha < b.cita.fecha) ? 1 : -1); 
    } else if(parameter==="hora") {
      citas.sort((a, b) => (a.cita.hora < b.cita.hora) ? 1 : -1); 
    }else if(parameter==="consultorio") { 
      citas.sort((a, b) => (a.cita.consultorio < b.cita.consultorio) ? 1 : -1);
    } else if(parameter==="doctor") { 
      citas.sort((a, b) => (a.cita.doctor < b.cita.doctor) ? 1 : -1);
    } else if(parameter==="tratamiento") { 
      citas.sort((a, b) => (a.cita.tratamiento < b.cita.tratamiento) ? 1 : -1);
    }
  };
  renderContent(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) => {
  const root = ReactDOM.createRoot(document.getElementById('contenidoCitas'));
  root.render(ElementRender(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarCitas = ({ urlApiCitas,pacientes,tratamientos,doctores,consultorios }) => {
  const citas = useFetch(urlApiCitas).data;
  return(
    <div className="App">
      <div id="contenidoCitas">
        { ElementRender(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};