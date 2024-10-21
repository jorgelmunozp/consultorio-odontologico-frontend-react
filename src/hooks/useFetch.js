
import { useState, useEffect } from 'react'
import { getData } from '../helpers/getData';

export const useFetch = ( urlApi ) => {
    const [responseFetch, setResponseFetch] = useState({ data: [], status: 0 });
    useEffect( () => { 
        getData( urlApi )
            .then( datos => setResponseFetch({ data: datos.data, status: datos.status }) ) 
            .catch((error) => console.log("Error useFetch: " + error.message));
    }, []);

    return responseFetch;
}