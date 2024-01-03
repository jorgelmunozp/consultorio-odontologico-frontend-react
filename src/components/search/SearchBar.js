import React from 'react';
import { TextField } from "@mui/material";

export const SearchBar = ({ icon='🔎',titles,queries,setQueries }) => {
    return (
        <div>
            <p>
                <a className="form-control border border-muted text-center text-decoration-none shadow-sm py-0 py-sm-1 w-75" data-bs-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">
                    { icon }
                </a>
            </p>
            <div id="collapseContent" className="collapse pb-2">
                <div className="card card-body shadow-sm text-start">
                    <div className='container-fluid'>
                        <div className='row d-block d-sm-flex'>
                            {
                                titles.map((title, index)=>{
                                    return (
                                        <TextField key={title} id={title} defaultValue={queries[index]} onChange={(target) => setQueries[index](target.target.value)} label={title} variant='outlined' margin='dense' fullWidth className='col' />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
