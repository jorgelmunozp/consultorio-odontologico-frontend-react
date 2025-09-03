export const getEspecialidadesFiltered = ( array=[],code='',name='' ) => {
    return array.filter( item => item._id.toString().includes(code) && item.especialidad.nombre.toLowerCase().includes(name.toLowerCase()) );
}