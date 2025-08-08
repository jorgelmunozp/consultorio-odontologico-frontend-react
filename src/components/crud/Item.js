import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ReadItem } from './ReadItem.js';
import { UpdateItem } from './UpdateItem.js';
import { DeleteItem } from './DeleteItem.js';

export const Item = ({ classType, icons, item, urlApi, objectClass, handleDeleteItem }) => {
    const [open, setOpen] = useState(false);

    const IconRead = icons[classType].IconRead;
    const IconSearch = icons[classType].IconSearch;
    const IconEdit = icons[classType].IconEdit;
    const IconDelete = icons[classType].IconDelete;

    const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];

    const components = {
        read:   <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />,
        update: <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setOpen} objectClass={objectClass} icons={icons} />,
        delete: <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} handleDeleteItem={handleDeleteItem} />
    };

    // Bloquear scroll cuando hay modal abierto
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