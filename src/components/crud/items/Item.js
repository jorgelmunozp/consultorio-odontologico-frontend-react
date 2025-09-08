import { lazy, useState } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../../theme/ThemeContext.js';
import { formatterHour12 } from '../../../helpers/formatterHour12.js';

const ReadItem = lazy(() => import('../ReadItem.js'));
const UpdateItem = lazy(() => import('../UpdateItem.js'));
const DeleteItem = lazy(() => import('../DeleteItem.js'));

export const Item = ({ classType, Icons, item={}, urlApi, handleItems }) => {
    const { theme } = useThemeContext();        // 👈 Call the global theme

    const [open, setOpen] = useState(false);

    const IconRead = Icons[classType].IconRead;
    const IconSearch = Icons[classType].IconSearch;
    const IconEdit = Icons[classType].IconEdit;
    const IconDelete = Icons[classType].IconDelete;

    const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];

    const components = {
        read:   <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />,
        update: <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setOpen} handleItems={handleItems} />,
        delete: <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} handleItems={handleItems} />
    };

    if (open) { document.body.classList.add('noScroll'); } else { document.body.classList.remove('noScroll'); }

    return (
        <>
            {/* <div className='col-3 col-sm-2 text-nowrap'>{ item._id }</div> */}
            { Object.entries(item?.[classType] || {}).map(([key, value], index) => (
                <span key={'item'+index} className={'text-start text-nowrap ms-2 ms-sm-2 pe-0' + (wideItems.includes(key) ? ' col-6 col-sm-3' : ' col-4 col-sm-2') } data-theme={theme}>
                {/* <div key={'item'+index} className={'text-start text-nowrap' + (wideItems.includes(key) ? ' col-6 col-sm-3' : ( key==='hora') ? ' col-3 col-sm-1' : ' col-4 col-sm-2') }> */}
                    { key==='hora'? formatterHour12(value) : value }
                </span>
            ))}

            {/* Crud buttons */}
            <div className='col'><button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('read')}><IconSearch width={'1.5'} height={'1.5'} /></button>
                                 <button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('update')}><IconEdit width={'1.5'} height={'1.5'} /></button>
                                 <button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('delete')}><IconDelete width={'1.5'} height={'1.5'} /></button></div>

            {/* Modal con portal */}
            { open && createPortal( <div id="modal">{ components[open] }</div>, document.body ) }
        </>
    );
}

export default Item;