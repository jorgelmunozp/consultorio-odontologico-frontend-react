export const getData = async( urlApi ) => {
    let responseFetch = { data: {}, status: 0 };
    await fetch( urlApi )
        .then(response => { console.log("response getData: ", response); responseFetch.status = response.status; return response.json()})
        .then(data => responseFetch.data = data)
        .catch((error) =>{ console.log("error.message: ",error.message)
            if(error.message === 'Failed to fetch') { responseFetch.status = 500 }
        });
    
    return responseFetch;
}