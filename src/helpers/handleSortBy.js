export const handleSortBy = (dir,parameter,urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) => {
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
    }
    console.log(citas)
};