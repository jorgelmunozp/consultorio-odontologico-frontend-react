import { Input } from '../forms/inputs/Input';

export const SearchBar = ({ icon='🔎',items,queries,setQueries,className }) => {
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
                            <Input placeholder={'Código'} key={'number0'} value={queries[0]} type={'number'} onChange={(target) => setQueries[0](target.target.value) } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                        </div>
                        <div className='row d-block d-sm-flex'>
                            {   items.map((item, index)=>{
                                    return ( <Input key={item.type+index} value={queries[index+1]} type={item.type} onChange={(target) => setQueries[index+1](target.target.value) } placeholder={item.title.charAt(0).toUpperCase() + item.title.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /> )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
