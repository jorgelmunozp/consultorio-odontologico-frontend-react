import { lazy, memo, useCallback, useMemo } from 'react';
import { useThemeContext } from '../../theme/ThemeContext.js';
import { myColor } from '../../global.js';

const Input = memo( lazy(() => import('../forms/inputs/Input.js')) );

export const SearchItem = ({ classType, Icon, items=[], queries, setQueries,className='', setOpen }) => {  
    const { theme } = useThemeContext();       // 👈 Call the global theme
  
    // Capitaliza el nombre del tipo de clase para mostrar en el título
    const capitalizedClassType = useMemo( () => classType.charAt(0).toUpperCase() + classType.slice(1), [classType] );

    // 👇 Manejo memorizado de cambios en un solo array
    const handleChange = useCallback((index, value) => {
        setQueries(prev => { const newQueries = [...prev];
                             newQueries[index] = value;
                             return newQueries;
        });
    }, [setQueries]);

    // 👇 Close view memorized handler
    const handleClose = useCallback(() => setOpen(false), [setOpen]); 

    if( process.env.NODE_ENV === 'development' ) { console.log('[SearchItem 🔎]') }

    return (
    <>
      <div className={'modalContainer justify-items-center'}>
        <div className={'modalBox'} data-theme={theme}>
          <div className={'modalHeader'}>
             <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
             <h6 className="modalTitle century-gothic main-color pt-2">Buscar {capitalizedClassType}</h6>
          </div>
          <div className={'modalContent'}>
            <div className='container-fluid modalTable mt-2'>
                <div className='row bg-row'><Input placeholder={'Código'} key={'number0'} value={queries[0]} type={'number'} handleChange={(target) => handleChange(0, target)} className={'input form-control rounded border-muted border-1 text-center shadow-sm'} /></div>
                    { items.map((item, index) => 
                        <div key={item.key} className='row bg-row'>
                            <div className="col px-0"><Input key={item.type+index} value={queries[index+1]} type={item.type !== 'dropdown' ? item.type : 'search' } handleChange={(target) => handleChange(index + 1, target)} placeholder={item.key } className={'input form-control rounded border-muted border-1 text-center shadow-sm'} /></div>
                        </div> ) 
                    }
            </div>
          </div>
          <div className={'modalFooter'}>
            <div className={'d-flex mt-2 w-100'}>
              <button className={'aceptBtn w-100'} onClick={() => { handleClose(); }}>Buscar</button>
              <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={'darkBackground'} onClick={ handleClose }></div>
    </>        
    )
}

export default memo(SearchItem);