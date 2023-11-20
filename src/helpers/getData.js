export const getData = async( urlApi ) => {
    const resp = await fetch( urlApi );
    const doctores = await resp.json();

    return doctores;
}