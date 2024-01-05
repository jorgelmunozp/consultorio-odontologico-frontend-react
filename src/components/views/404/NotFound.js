import { Link } from "react-router-dom";
import { Navbar } from '../../menu/Navbar';
import { Logo } from '../../icons/logo/Logo';
import { HomeMenu } from '../../icons/home/HomeMenu';
import { Warning } from "../../icons/warning/Warning";
import { PiWarningCircleThin } from "react-icons/pi";

export const NotFound = ({ urlBaseFrontend,myColor,myTitle }) => {
  return (
    <div className="App w-100 user-select-none">
      <header className="fixed-top shadow-lg text-center py-2">
        <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg user-select-none">
          <div className="container-fluid justify-content-center">
            <Link className="navbar-brand main-color" to={"/" + urlBaseFrontend + "/index"} >
              <Logo color={myColor} height={1.4} width={1.4} />
            </Link>
          </div>
        </nav>
      </header>
      <body className='App-body d-flex bg-white mt-5'>
        <div id='contenidoBody' className='contenidoBody mt-5 mx-auto'>
          <div className="container-fluid text-center">
            <h1 className="text-muted mt-4"><Warning height={2} width={2}/></h1>
            <h1 className="text-muted">404</h1>
            <h4 className="main-color">Oops! Enlace inexistente</h4>
            <p className="mt-4">Regresa a nuestro portal</p>
            <Link className="main-color text-decoration-none" to={'/' + urlBaseFrontend}>Inicio</Link>
            <br></br>
            <Link className="main-color text-decoration-none" to={'/' + urlBaseFrontend}><HomeMenu strokeWidth={20}/></Link>
          </div>
        </div>
      </body>
    </div>
  )
}
