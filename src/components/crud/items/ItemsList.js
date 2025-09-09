import { lazy, memo, useMemo, useCallback } from 'react';
import { getArrow } from '../../../helpers/getArrow.js';

const Item = lazy(() => import('./Item.js'));

export const ItemsList = ({classType, Icons, keys=[], urlApi, array, SortByProperty, setSortBy, indexPage, handleItems }) => {
  // 👇 Memoriza el array ordenado + paginado
  const sortedItems = useMemo(() => {
    return [...array].sort(SortByProperty).slice(indexPage[0], indexPage[1]);
  }, [array, SortByProperty, indexPage]);

  // 👇 Memoriza el handler de orden para que no cambie en cada render
  const handleSort = useCallback( (order) => setSortBy(order), [setSortBy] );

  return (
    <div className={'container-fluid border overflow-auto px-0' }>
        {/* 👇 Titles Row */}
        <div className={'row flex-nowrap bg-main-color'}>
          { keys.map((item,index) => { return( <span key={'title'+index} className={'bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' + ( item.type === 'dropdown' ? ' col-6 col-sm-3':' col-4 col-sm-2') }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 ms-1 ms-sm-3 align-self-center white-color'>{ item.key }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={() => handleSort(1 + (index + 1)*2)}>{getArrow("up")}</button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={() => handleSort(2 + (index + 1)*2)}>{getArrow("down")}</button></div></div></div></span> )}) }
          {/* { keys.map((item,index) => { return( <span key={'title'+index} className={'bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' + ( item.type === 'dropdown' ? ' col-6 col-sm-3':item.title === 'Hora' ? ' col-3 col-sm-1':' col-4 col-sm-2') }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ item.key }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 1 + (index + 1)*2 )}>{getArrow("up")}</button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 2 + (index + 1)*2 )}>{getArrow("down")}</button></div></div></div></span> )}) } */}
          <div className='col-2 col-sm-1 bg-main-color border-bottom border-dark'></div>        {/* header botones crud */}
        </div>
        {/* 👇 Item Row */}
        { sortedItems.map((item,index) => { return (
            <div id={`row${classType}${index}`} key={`row${classType}${index}`} className='row bg-row flex-nowrap border-bottom text-start text-nowrap py-2 w-100'>
              <Item key={'item'+classType+index} classType={classType} Icons={Icons} item={item} urlApi={urlApi} handleItems={handleItems} />
            </div>
            )})
        }
    </div>
  )
}

export default memo(ItemsList);