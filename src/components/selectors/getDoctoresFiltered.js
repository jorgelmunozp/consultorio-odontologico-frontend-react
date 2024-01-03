export const getDoctoresFiltered = ( array,code='',name='',lastname='',speciality='' ) => {
    return array.filter( item => item.id.toString().includes(code) && item.doctor.nombre.toLowerCase().includes(name.toLowerCase()) && item.doctor.apellido.toLowerCase().includes(lastname.toLowerCase()) && item.doctor.especialidad.toLowerCase().includes(speciality.toLowerCase()) );
}