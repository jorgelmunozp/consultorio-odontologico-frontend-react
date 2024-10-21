export const getData = async( urlApi ) => {
    let responseFetch = { data: {}, status: 0 };
    await fetch( urlApi )
        .then(response => { responseFetch.status = response.status; return response.json()})
        .then(data => responseFetch.data = data)
        .catch((error) =>{
            if(error.message === 'Failed to fetch') { responseFetch.status = 500 }
        });
    
    return responseFetch;
}