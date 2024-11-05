import { useState } from 'react';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';

export const Item = ({ classType, icons, item, urlApi, state }) => {
    const [readOpen, setReadOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const IconRead = icons[classType].IconRead;                                                               // Selección de icono read
    const IconSearch = icons[classType].IconSearch;                                                           // Selección de icono search
    const IconEdit = icons[classType].IconEdit;                                                               // Selección de icono update
    const IconDelete = icons[classType].IconDelete;                                                           // Selección de icono delete

    (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').classList.add('noScroll') : document.getElementById('body').classList.remove('noScroll')   // No scroll when alerts are open
    
    const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];       // Wide columns
 
    return (
        <>
            <div className='col-3 col-sm-2 text-nowrap'>{ item.id }</div>
            { Object.entries(item[classType]).map((item,index) => {
                return( <div key={'item'+index} className={'text-start text-nowrap' + ( wideItems.includes(item[0]) ? ' col-6 col-sm-3':' col-4 col-sm-2') }>{ (typeof item[1] !== 'object') ? item[1] : Object.values(item[1])[0]+' '+Object.values(item[1])[1] }</div> )})
            }
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setReadOpen(true) }><IconSearch /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setUpdateOpen(true) }><IconEdit /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setDeleteOpen(true)}><IconDelete /></button></div>
            
            { readOpen && <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setReadOpen} /> }
            { updateOpen && <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setUpdateOpen} Item={Item} icons={icons} state={state} /> }
            { deleteOpen && <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setDeleteOpen} />  }
        </>       
    )
}

export default Item;