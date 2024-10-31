
export const CrudView = ({ classType, Icon, services, isMenuOpen, setMenu }) => {
  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>{ classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
          <Icon height={5} width={5} strokeWidth={1} className='text-muted main-color'/>
        </center>
        <div className={'container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 ' + (isMenuOpen ? ' ps-5':'' )}>
          <div className="container-fluid bg-light px-0 pt-2">
            <div className="row">   
              {
                services.map((service,index) => {
                  return (
                    <div key={ service.title + index } className="col-lg-2 col-sm-4 col-4 mb-1 mb-sm-2 text-center">
                      <div className="card border-0 rounded-xs pt-0 shadow">
                        <button onClick={() => setMenu( service.menu )} className="border-0">
                          <div className="card-body">
                            <i className="main-color">{ service.icon }</i>
                            <h6 className="text-secondary d-none d-md-block text-nowrap text-truncate fs-6 fs-sm-1 mt-1 mt-sm-2 mb-0 mb-sm-2">{ service.title }</h6>
                          </div>
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
			  </div>
      </div>
    </div>
  );
};