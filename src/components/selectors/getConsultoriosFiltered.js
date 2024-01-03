export const getConsultoriosFiltered = ( array,code='',number='',name='' ) => {
    return array.filter( item => item.id.toString().includes(code) && item.consultorio.numero.toString().includes(number) && item.consultorio.nombre.toLowerCase().includes(name.toLowerCase()) );
}