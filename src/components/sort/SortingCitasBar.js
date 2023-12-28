export const SortingCitasBar = ({ setSortBy,Arrows }) => {
  return (
    <div className='row flex-nowrap bg-main-color text-white border'>

      <div className='col-3 col-md-1 bg-main-color'>
        <small className='row flex-nowrap align-items-center justify-content-around'>
          <div className='col'><span className=''>Código</span></div>
          <div className='col-1'>
            <div className='row'>
              <div className='col'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>
      </div>

      <div className='col-4 col-md-2 bg-main-color'>
        <small className='row flex-nowrap align-items-center justify-content-around'>
          <div className='col-1'><span className=''>Paciente</span></div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>
      
      <div className='col-4 col-md-2 bg-main-color'>
        <small className='row flex-nowrap align-items-center justify-content-around'>
          <div className='col'><span className=''>Fecha</span></div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>

      <div className='col-2 col-md-1 bg-main-color'>
        <small className='row flex-nowrap align-items-center  justify-content-around'>
          <div className='col'><span className='justify-content-center'>Hora</span></div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>

      <div className='col-2 col-md-1 bg-main-color'>
        <small className='row flex-nowrap align-items-center  justify-content-around'>
          <div className='col'>Consultorio</div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>

      <div className='col-4 col-md-2 bg-main-color'>
        <small className='row flex-nowrap align-items-center  justify-content-around'>
          <div className='col'>Médico</div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>
      
      <div className='col-4 col-md-2 bg-main-color'>
        <small className='row flex-nowrap align-items-center  justify-content-around'>
          <div className='col'>Tratamiento</div>
          <div className='col-1'>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(13)}><Arrows direction={"up"}/></button>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 px-0'>
                <button className='p-0 bg-main-color text-white main-color-hover border-0' onClick={()=>setSortBy(14)}><Arrows direction={"down"}/></button>
              </div>
            </div>
          </div>
        </small>   
      </div>

      <div className='col-6 col-md-2 bg-main-color'>
        <small className='row flex-nowrap align-items-center justify-content-around'>
          <div className='col'></div>
        </small>   
      </div>

    </div>
  )
}