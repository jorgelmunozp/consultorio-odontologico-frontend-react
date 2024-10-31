import { TextField } from "@mui/material";
import { Input } from '../forms/inputs/Input';

export const SearchBar = ({ icon='🔎',placeholders,queries,setQueries,className,isMenuOpen }) => {
    return (
        <div className={ className }>
            <p>
                <a className="form-control border border-muted text-center text-decoration-none shadow-sm py-0 py-sm-1 w-75" data-bs-toggle="collapse" href="#collapseContent" role="button" aria-expanded="false" aria-controls="collapseContent">
                    { icon }
                </a>
            </p>
            <div id="collapseContent" className="collapse pb-2">
                <div className="card card-body shadow-sm">
                    <div className='container-fluid'>
                        <div className='row d-block d-sm-flex'>
                            {
                                placeholders.map((title, index)=>{
                                    return (
                                        <>
                                        <TextField key={title} id={title} defaultValue={queries[index]} onChange={(target) => setQueries[index](target.target.value)} label={title} variant='outlined' margin='dense' fullWidth className='col' />
                                        <Input />
                                        {/* <Input property={ property } className={'col input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /> */}
                                        </>
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
