export const SortingConsultoriosBar = ({ setSortBy,Arrows }) => {
  return (
    <thead>
      <tr className="">
        <th className='border-0 p-0 ps-1 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Número</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th className='p-0' colSpan='3'></th>
      </tr>
    </thead>
  )
}