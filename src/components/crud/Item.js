import { createRoot } from 'react-dom/client';
import { useState, useEffect, Fragment } from 'react';
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

    if ( open !== false ) {
            document.getElementById('root').insertAdjacentHTML('afterend',`<div id="modal"></div>`);
            modalRoot = createRoot( document.getElementById('modal') );

            switch (open) {
                case 'read': modalRoot.render( <ReadItem classType={classType} Icon={IconRead} item={item} setOpen={setOpen} />  ); break;
                case 'update': modalRoot.render( <UpdateItem classType={classType} Icon={IconEdit} item={item} urlApi={urlApi} setOpen={setOpen} state={state} icons={icons} wideItems={wideItems} /> ); break;
                case 'delete': modalRoot.render( <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setOpen} /> ); break;
            }
        setOpen(false);
    }

    return (    <>
                    <div className='col-3 col-sm-2 text-nowrap'>{ item.id }</div>
                    { Object.entries(item[classType]).map((item,index) => {
                        return( <div key={'item'+index} className={'text-start text-nowrap' + ( wideItems.includes(item[0]) ? ' col-6 col-sm-3':' col-4 col-sm-2') }>{ item[1] }</div> ) })
                    }
                    <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('read') }><IconSearch /></button></div>
                    <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('update') }><IconEdit /></button></div>
                    <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setOpen('delete')}><IconDelete /></button></div>       
                </>
            )
}

export default Item;