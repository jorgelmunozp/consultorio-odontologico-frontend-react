import React from 'react';
import { TextField } from "@mui/material";

export const Search = ({ icon='🔎',query='',setQuery }) => {
    return (
        <div>
            <p>
            <a className="form-control border border-muted text-center text-decoration-none shadow-sm py-0 py-sm-1 w-75" data-bs-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">
                { icon }
            </a>
            </p>
            <div id="collapseContent" className="collapse pb-2 w-75">
            <div className="card card-body shadow-sm text-start">
                <div>
                    <TextField value={query} onChange={(target) => setQuery(target.target.value)} label="Buscar" variant="outlined" fullWidth />
                </div>
            </div>
            </div>
        </div>
    )
}
