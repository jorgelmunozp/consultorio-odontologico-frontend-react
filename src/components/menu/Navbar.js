import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { getDate } from '../../helpers/getDate';
import { getTime } from '../../helpers/getTime';
import { LoginScreen } from '../views/login/LoginScreen';
import { Error } from '../icons/error/Error';
import { Logo } from '../icons/logo/Logo';
import { HomeMenu } from '../icons/home/HomeMenu';
import { User } from '../icons/user/User';
import { Warning } from '../icons/warning/Warning';
import '../views/login/login.css';

export const Navbar = ({ urlBaseFrontend, myColor, myTitle, isMenuOpen, setMenu, setIsMenuOpen }) => {
    const [ alertMessage,setAlertMessage ] = useState("");
    const [ alertType,setAlertType ] = useState("");

    let fecha = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
    let hora = useState(getTime);

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate((urlBaseFrontend), { replace: true });
    }

    const handleMenu = () => { isMenuOpen === false ? setIsMenuOpen(true) : setIsMenuOpen(false) }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg user-select-none z-10000">
                <div className="container-fluid">
                    <NavLink className="navbar-brand main-color d-flex bg-transparent" to={"/" + urlBaseFrontend} onClick={() => setMenu(1)}>
                        <Logo color={myColor} width={1.25} height={1.25} strokeWidth={1.2} className='ms-3 ms-sm-4 me-2 mt-logo'/>
                        <span className='main-color'>{ myTitle }</span>
                    </NavLink>
                    {
                        ( user.logged )
                            ?   <>
                                    <NavLink className={ ({ isActive }) => 'nav-item nav-link' }
                                        onClick={ handleLogout } to={ urlBaseFrontend }>{ user.logged ? 'Salir' : '' }</NavLink>
                                </>
                            :   <>
                                    <div className="row justify-content-end me-2">
                                        <ul className="navbar-nav col">
                                            <NavLink className={ ({ isActive }) => 'nav-item nav-link' } data-bs-toggle="modal" data-bs-target="#loginModal" aria-controls="modalBody">
                                                <User color={myColor} height={1.3} width={1.3} strokeWidth={1.5}/>
                                            </NavLink>
                                        </ul>
                                        <ul className="navbar-nav col">
                                            <NavLink onClick={ handleMenu } className={ ({ isActive }) => 'nav-item nav-link' } data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody">
                                                <HomeMenu color={myColor} height={1.3} width={1.3} strokeWidth={5}/>
                                            </NavLink>
                                        </ul>
                                    </div>
                                </>
                    }
                </div>
            </nav>
            <center>
                <div className="modal fade align-self-auto" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-modalContainer">
                        <div className="modal-content">
                            <div className="modal-header d-grid mx-auto border-0 mt-4 pb-1">
                                <User strokeWidth={1} height={1.5} width={1.5} data-bs-dismiss="modal" className="modal-title main-color fs-5" />
                                <h1 className="modal-title main-color fs-5 pb-4" id="loginModalLabel">Ingresar</h1>
                            </div>
                            <div className="modal-body mx-auto w-100 pt-1">
                                <LoginScreen setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
                            </div>
                        </div>
                    </div>
                </div>
            {/** Modal Login */}
                <div className="modal fade align-self-auto" id="loginModalFail" tabIndex="-1" aria-labelledby="loginModalLabelFail" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-modalContainer">
                        <div className="modal-content">
                            <div className="modal-body mt-5 mx-auto w-100 pt-1">
                                { 
                                    ( user.logged ) 
                                        ?   <>
                                                <button type="button" className="border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close">
                                                    <Logo strokeWidth={1} height={1.5} width={1.5} data-bs-dismiss="modal" className="modal-title main-color fs-5" />
                                                </button>
                                                <div className="container">
                                                    <p className="text-muted mt-4">Fecha: { fecha } Hora: { hora }</p>
                                                    <p className="text-muted mt-4">Agenda del día</p>
                                                </div>
                                            </>
                                        : ( alertType === "warning" )
                                            ? <Warning color={"#ffc107"} height={5} width={5} strokeWidth={0}/> 
                                            : <Error color={"#dc3545"} height={5} width={5} strokeWidth={0}/>
                                }
                                <p className='text-muted mt-3 pb-4'>{ user.logged ? '' : alertMessage }</p>
                                {
                                    ( user.logged )
                                    ?   <>
                                            <button type="button" className="btn btn-login mb-3 p-3 w-100 shadow-sm" data-bs-dismiss="modal">Aceptar</button>
                                        </>
                                    :   <div className='container pb-3'>
                                            <button className='btn btn-login my-1 p-3 w-100 shadow-sm' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal" aria-controls="modalBody">Reintentar</button>
                                            <button type="button" className="btn btn-outline-danger p-3 w-100 shadow-sm" data-bs-dismiss="modal">Cancelar</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}