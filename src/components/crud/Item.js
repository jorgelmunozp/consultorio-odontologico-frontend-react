import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ReadItem } from './ReadItem.js';
import { UpdateItem } from './UpdateItem.js';
import { DeleteItem } from './DeleteItem.js';

export const Item = ({ classType, Icons, item, urlApi, objectClass, handleItems, theme }) => {
    const [open, setOpen] = useState(false);

    const IconRead = Icons[classType].IconRead;
    const IconSearch = Icons[classType].IconSearch;
    const IconEdit = Icons[classType].IconEdit;
    const IconDelete = Icons[classType].IconDelete;

    const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];

    const components = {
        read:   <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />,
        update: <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setOpen} objectClass={objectClass} handleItems={handleItems} theme={theme} />,
        delete: <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} handleItems={handleItems} />
    };

    if (open) { document.body.classList.add('noScroll'); } else { document.body.classList.remove('noScroll'); }

    return (
        <>
            <div className='col-3 col-sm-2 text-nowrap'>{ item.id }</div>
            { Object.entries(item[classType]).map(([key, value], index) => (
                <div key={'item'+index} className={'text-start text-nowrap' + (wideItems.includes(key) ? ' col-6 col-sm-3' : ' col-4 col-sm-2') }>
                    { value }
                </div>
            ))}
            <div className='col'><button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('read')}><IconSearch /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('update')}><IconEdit /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('delete')}><IconDelete /></button></div>

            {/* Modal con portal */}
            { open && createPortal( <div id="modal">{ components[open] }</div>, document.body ) }
        </>
    );
}

export default Item;