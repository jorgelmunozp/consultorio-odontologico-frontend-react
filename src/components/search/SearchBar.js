import './search.css';
import { lazy, memo, useCallback } from 'react';
import { useThemeContext } from '../../theme/ThemeContext.js';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../global.js';

const Input = lazy(() => import('../forms/inputs/Input.js'));
const SearchIcon = memo( lazy(() => import('./SearchIcon.js')) );

export const SearchBar = ({ Icon=SearchIcon,items=[],queries,setQueries,className }) => {
    const { theme } = useThemeContext();       // 👈 Call the global theme

    if( process.env.NODE_ENV === 'development' ) { console.log('[Search 🔎]') }

    // 👇 Manejo memorizado de cambios en un solo array
    const handleChange = useCallback((index, value) => {
        setQueries(prev => { const newQueries = [...prev];
                             newQueries[index] = value;
                             return newQueries;
        });
    }, [setQueries]);

    return (
        <div className={ className + ' justify-items-center bg-transparent' }>
            <button data-bs-toggle="collapse" href="#collapseContent" className="form-control border border-muted text-center text-decoration-none py-0 py-sm-1 w-75 justify-items-center box-shadow bg-transparent" aria-expanded="false" aria-controls="collapseContent">
                <Icon height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'main-color jumpHover'}/>
            </button>
            <div id="collapseContent" className="collapse pb-2 slideIn smooth w-100" data-theme={theme} >
                <div className="card card-body bg-transparent shadow-sm">
                    <div className='container-fluid'>
                        <div className='row d-block d-sm-flex'>
                            <Input placeholder={'Código'} key={'number0'} value={queries[0]} type={'number'} handleChange={(target) => handleChange(0, target)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                        </div>
                        <div className='row d-block d-sm-flex'>
                            {   items.map((item, index)=>{
                                    return ( <Input key={item.type+index} value={queries[index+1]} type={item.type} handleChange={(target) => handleChange(index + 1, target)} placeholder={item.key } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /> )
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