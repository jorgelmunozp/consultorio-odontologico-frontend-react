import './search.css';
import { lazy, memo } from 'react';
import { useThemeContext } from '../../theme/ThemeContext.js';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../global.js';
import { jwtDecode as decode } from "jwt-decode";

const Input = lazy(() => import('../forms/inputs/Input.js'));
const SearchIcon = memo( lazy(() => import('./SearchIcon.js')) );

export const SearchBar = ({ Icon=SearchIcon,items=[],queries,setQueries,className }) => {
    const { theme } = useThemeContext();       // 👈 Call the global theme

    return (
        <div className={ className + ' justify-items-center bg-transparent' }>
            <button data-bs-toggle="collapse" href="#collapseContent" className="form-control border border-muted text-center text-decoration-none py-0 py-sm-1 w-75 justify-items-center box-shadow bg-transparent" aria-expanded="false" aria-controls="collapseContent">
                <Icon height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'main-color jumpHover'}/>
            </button>
            <div id="collapseContent" className="collapse pb-2 slideIn smooth" data-theme={theme} >
                <div className="card card-body shadow-sm">
                    <div className='container-fluid'>
                        <div className='row d-block d-sm-flex'>
                            <Input placeholder={'Código'} key={'number0'} value={queries[0]} type={'number'} handleChange={(target) => setQueries[0]( decode(target) ) } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                        </div>
                        <div className='row d-block d-sm-flex'>
                            {   items.map((item, index)=>{
                                    return ( <Input key={item.type+index} value={queries[index+1]} type={item.type} handleChange={(target) => setQueries[index+1]( decode(target) ) } placeholder={item.title.charAt(0).toUpperCase() + item.title.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /> )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchBar;