import { Item } from './Item';
import { Arrows } from '../forms/arrows/Arrows';

export const ItemsTable = ({classType, icons, titles, urlApi, array, state, SortByProperty, setSortBy, indexPage }) => {
  return (
    <div className={'container-fluid border overflow-auto px-0' }>
        <div className={'row flex-nowrap bg-main-color'}>
          <span className={'col-3 col-sm-2 bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ 'Código' }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></div></div></div></span>
          { titles.map((item,index) => { return( <span key={'title'+index} className={'bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' + ( item.type === 'dropdown' ? ' col-6 col-sm-3':' col-4 col-sm-2') }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ item.title }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 1 + (index + 1)*2 )}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 2 + (index + 1)*2 )}><Arrows direction={"down"}/></button></div></div></div></span> )}) }
          <div className='col-8 col-sm-3 bg-main-color border-bottom border-dark'></div>        {/* header botones crud */}
        </div>
        { array.sort(SortByProperty).slice(indexPage[0],indexPage[1]).map((item) => { return (
            <div id={'row'+item.id } key={ item.id } className='row flex-nowrap border-bottom text-start text-nowrap py-2' >
              <Item classType={classType} icons={icons} item={item} urlApi={urlApi} state={state} />
            </div>
            )})
        }
    </div>
  )
}

export default ItemsTable;
