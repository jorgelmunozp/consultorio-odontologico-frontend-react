export const getTratamientosFiltered = ( array,code='',name='',consultoryRoom='',doctor='' ) => {
    return array.filter( item => item.id.toString().includes(code) && item.tratamiento.nombre.toLowerCase().includes(name.toLowerCase()) && item.tratamiento.consultorio.toLowerCase().includes(consultoryRoom.toLowerCase()) && item.tratamiento.doctor.toLowerCase().includes(doctor.toLowerCase()) );
}