import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { LoginForm } from '../login/LoginForm';
import { Logo } from '../icons/logo/LogoThick';
import { HomeMenu } from '../icons/home/HomeMenu';
import { User } from '../icons/user/User';
import '../login/login.css';

export const Navbar = ({urlBaseFrontend, myColor, myTitle}) => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate((urlBaseFrontend), { replace: true });
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg user-select-none">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={"/" + urlBaseFrontend}>
                        <Logo color={myColor} width={1.35} height={1.35} strokeWidth={1.5} className='navbar-brand ms-3 me-0'/>
                        <span className='main-color'>{ myTitle }</span>
                    </NavLink>
                    {
                        (user.logged)
                            ?   <>
                                    <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') }
                                        onClick={ handleLogout } to={ urlBaseFrontend }>{ user.logged ? 'Salir' : '' }</NavLink>
                                </>
                            :   <>
                                    <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } data-bs-toggle="modal" data-bs-target="#loginModal" aria-controls="modalBody">
                                        <User color={myColor} height={1.3} width={1.3} strokeWidth={1.5}/>
                                    </NavLink>
                                    <NavLink className={ ({ isActive }) => 'nav-item nav-link ' + (isActive ? 'active' : '') } data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody">
                                        <HomeMenu color={myColor} height={1.3} width={1.3} strokeWidth={5}/>
                                    </NavLink>
                                </>
                    }
                </div>
            </nav>
            {/** Modal Login */}
            <center>
                <div className="modal fade align-self-auto" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header mx-auto border-0 mt-4 pb-1">
                                <button type="button" className="border-0 bg-transparent" data-bs-dismiss="modal" aria-label="Close">
                                    <Logo strokeWidth={1} height={1.5} width={1.5} data-bs-dismiss="modal" className="modal-title main-color fs-5" />
                                </button>
                            </div>
                            <div className="modal-body mx-auto w-100 pt-1">
                                <h1 className="modal-title main-color fs-5 pb-4" id="loginModalLabel">{ myTitle }</h1>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </>
    )
}