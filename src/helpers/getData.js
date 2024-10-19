export const getData = async( urlApi ) => {
    let responseReturn = [];
    await fetch( urlApi )
        .then(response => response.json())
        .then(data => responseReturn = data)
        .catch((error) => console.log("Error getData: " + error.message));
    return responseReturn;
}