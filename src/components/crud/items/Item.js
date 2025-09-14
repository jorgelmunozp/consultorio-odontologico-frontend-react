import { lazy, memo, useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../../theme/ThemeContext.js';
import { formatterHour12 } from '../../../helpers/formatterHour12.js';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../../global.js';

const ReadItem = lazy(() => import('../ReadItem.js'));
const UpdateItem = lazy(() => import('../UpdateItem.js'));
const DeleteItem = lazy(() => import('../DeleteItem.js'));

const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];

export const Item = memo(({ classType, Icons, item={}, urlApi, handleItems }) => {
    const { theme } = useThemeContext();        // 👈 Call the global theme

    const [open, setOpen] = useState(false);

    const { IconRead, IconSearch, IconUpdate, IconDelete } = Icons[classType];

    // 👇 Componentes del CRUD memorizados
    const components = useMemo(() => ({
        read:   <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />,
        update: <UpdateItem classType={classType} Icon={IconUpdate} item={item} urlApi={urlApi} setOpen={setOpen} handleItems={handleItems} />,
        delete: <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} handleItems={handleItems} />
    }), [classType, IconRead, IconUpdate, item, urlApi, handleItems]);

    // 👇 Hace scroll-lock solo cuando cambia 'open'
    useEffect(() => {
        if (open) { document.body.classList.add('noScroll'); } 
        else { document.body.classList.remove('noScroll'); }
        return () => document.body.classList.remove('noScroll'); // cleanup
    }, [open]);

    // 👇 Función para obtener clases de columna
    const columnClass = useCallback((key) => {
        // return wideItems.includes(key) ? 'col-6 col-sm-3' : ( key==='hora' ? 'col-3 col-sm-1' : 'col-4 col-sm-2' );
        return wideItems.includes(key) ? 'col-6 col-sm-3' : 'col-4 col-sm-2';
    }, []);

    return (
        <>
            {/* <div className='col-3 col-sm-2 text-nowrap'>{ item._id }</div> */}
            { Object.entries(item?.[classType] || {}).map(([key, value], index) => (
                <span key={'item'+index} className={`text-start text-nowrap ms-2 ms-sm-2 pe-0 ${columnClass(key)}`} data-theme={theme}>
                    { key==='hora'? formatterHour12(value) : value }
                </span>
            ))}

            {/* 👇 Crud buttons */}
            <div className='col'><button className='border-0 bg-transparent iconBtn main-color' onClick={()=>setOpen('read')}><IconSearch width={iconWidth} height={iconHeight} strokeWidth={iconStrokeWidth} /></button>
                                 <button className='border-0 bg-transparent iconBtn main-color' onClick={()=>setOpen('update')}><IconUpdate width={iconWidth} height={iconHeight} strokeWidth={iconStrokeWidth} /></button>
                                 <button className='border-0 bg-transparent iconBtn main-color' onClick={()=>setOpen('delete')}><IconDelete width={iconWidth} height={iconHeight} strokeWidth={iconStrokeWidth} /></button></div>

            {/* 👇 Modal con portal */}
            { open && createPortal( <div id="modal">{ components[open] }</div>, document.body ) }
        </>
    );
});

export default memo(Item);