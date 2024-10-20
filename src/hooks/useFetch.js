
import { useState, useEffect } from 'react'
import { getData } from '../helpers/getData';

export const useFetch = ( urlApi ) => {
    // const [state, setState] = useState({data: [],});
    const [responseFetch, setResponseFetch] = useState({ data: [], status: 0 });
    useEffect( () => { 
        getData( urlApi )
            // .then( datos => setState({data: datos.data,}) )
            .then( datos => setResponseFetch({ data: datos.data, status: datos.status }) ) 
            .catch((error) => console.log("Error useFetch: " + error.message));
    }, []);

    // return state;
    return responseFetch;
}