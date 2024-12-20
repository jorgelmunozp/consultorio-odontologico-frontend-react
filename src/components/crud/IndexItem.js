
import { myColor } from '../../global';
export const IndexItem = ({ classType, Icon, services, isMenuOpen, setMenu }) => {
  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>{ classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
          <Icon color={myColor} height={4} width={4} strokeWidth={1} className='text-muted'/>
        </center>
        <div className={'container-fluid mt-2 pe-0 pe-md-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100' )}>
          <div className="container-fluid px-0 pt-2">
            <div className="row justify-content-center">   
              {
                services.map((service,index) => {
                  return (
                    <div key={ service.title + index } className="col-6 col-sm-4 mb-1 mb-sm-2 text-center">
                      <div className="card border-0 rounded-xs pt-0 jumpHover hover shadow">
                        <button onClick={() => setMenu( service.menu )} className="bg-transparent border-0">
                          <div className="card-body pt-4 pt-sm-5">
                            <service.Icon color={myColor} height={4} width={4} strokeWidth={1} className='text-muted' />
                            <h5 className="text-dark text-nowrap text-truncate fs-sm-2 mt-2 mt-sm-3 pb-3 pb-sm-4">{ service.title }</h5>
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