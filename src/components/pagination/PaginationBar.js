import './pagination.css'
export const PaginationBar = ({ array,itemsPerPage,indexPage,activePages,indexPages,setIndexPage,setActivePages }) => {
  return (
    <nav aria-label="Page navigation" className='mt-3'>
      <ul className="pagination pagination-sm justify-content-center">
        <li className="page-item"><button onClick={()=>{if(indexPage[0] >= 1){ setIndexPage([indexPage[0] - itemsPerPage,indexPage[1] - itemsPerPage]);const indexCurrentPage = activePages.indexOf(true);activePages.fill(false);activePages[indexCurrentPage-1]=true;setActivePages(activePages);} }} type='button' className="page-link rounded-circle page-arrow" aria-label="◂">◂</button></li>
        { indexPages.map(i => (
            <li key={i} className={activePages[i] ? "page-item fw-bolder" : "page-item"}><button value={i} onClick={(event)=>{event.preventDefault();setIndexPage([parseInt(event.target.value)*itemsPerPage,(parseInt(event.target.value) + 1)*itemsPerPage]);activePages.fill(false);activePages[i]=true;setActivePages(activePages);}} type='button' className="page-link rounded-circle fw-bolder">{ i + 1 }</button></li>
          )) }
        <li className="page-item"><button onClick={()=>{if(indexPage[0] < ( array.length-itemsPerPage) ){ setIndexPage([indexPage[0] + itemsPerPage,indexPage[1] + itemsPerPage]);const indexCurrentPage = activePages.indexOf(true);activePages.fill(false);activePages[indexCurrentPage+1]=true;setActivePages(activePages);}}} type='button' className="page-link rounded-circle page-arrow" aria-label="▸">▸</button></li>
      </ul>
    </nav>
  )
}