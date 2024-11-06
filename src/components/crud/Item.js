import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';

export const Item = ({ classType, icons, item, urlApi, state }) => {
    const [open, setOpen] = useState(false);                        // Input crud modal views status

    const IconRead = icons[classType].IconRead;                                                               // Selección de icono read
    const IconSearch = icons[classType].IconSearch;                                                               // Selección de icono read
    const IconEdit = icons[classType].IconEdit;                                                               // Selección de icono update
    const IconDelete = icons[classType].IconDelete;                                                           // Selección de icono delete

    const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad', 'genero', 'eps'];       // Wide columns

    ( open !== false ) ? document.getElementById('body').classList.add('noScroll') : document.getElementById('body').classList.remove('noScroll')   // No scroll when alerts are open
    
    let modalRoot = '';
    let isModalOpen = false;
    // const [isModalOpen, setIsModalOpen] = useState(false);

    if ( open !== false ) {
        state.forEach((property,index) =>{ property.setState( Object.values(item[classType])[index] ) });
        if( state[0].value !== '' ) {                                // Avoid an empty render
            document.getElementById('root').insertAdjacentHTML('afterend',`<div id="modal"></div>`);
            modalRoot = createRoot( document.getElementById('modal') );

            switch (open) {
                case 'read': modalRoot.render( <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />  ); break;
                case 'update': modalRoot.render( <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setOpen} icons={icons} state={state} /> ); break;
                case 'delete': modalRoot.render( <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} /> ); break;
            }
        }
    }

    return (
        <>
            <div className='col-3 col-sm-2 text-nowrap'>{ item.id }</div>
            { Object.entries(item[classType]).map((item,index) => {
                return( <div key={'item'+index} className={'text-start text-nowrap' + ( wideItems.includes(item[0]) ? ' col-6 col-sm-3':' col-4 col-sm-2') }>{ (typeof item[1] !== 'object') ? item[1] : Object.values(item[1])[0]+' '+Object.values(item[1])[1] }</div> )})
            }
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('read') }><IconSearch /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('update') }><IconEdit /></button></div>
            <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('delete')}><IconDelete /></button></div>       
        </>       
    )
}

export default Item;