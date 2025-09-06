import '../views/login/login.css';
import { lazy, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext.js';
import { types } from '../../types/types.js';

const User = lazy(() => import('../icons/user/User.js'));
const Moon = lazy(() => import('../icons/theme/Moon.js'));
const Sun = lazy(() => import('../icons/theme/Sun.js'));
const HomeMenu = lazy(() => import('../icons/home/HomeMenu.js'));
const Login = lazy(() => import('../views/login/Login.js'));

export const Navbar = ({ Logo, urlBaseFrontend, myColor, myTitle, setMenu, setIsMenuOpen, theme, handleTheme }) => {
    const [alertMessage,setAlertMessage] = useState("");
    const [alertType,setAlertType] = useState("");

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate((urlBaseFrontend), { replace: true });
    }

    const handleMenu = () => { setIsMenuOpen(prev => !prev) }

    return (
        <>
            <nav id="navbar" className="navbar navbar-expand-sm navbar-light fixed-top shadow-lg user-select-none z-10000" data-theme={theme} >
                <div className="container-fluid">
                    <NavLink className="navbar-brand main-color d-flex bg-transparent" to={"/" + urlBaseFrontend} onClick={() => setMenu(1)}>
                        <Logo color={myColor} width={1.25} height={1.25} strokeWidth={1.2} className='ms-0 ms-sm-4 me-0 me-sm-2 mt-logo'/>
                        <span className='main-color'>{ myTitle }</span>
                    </NavLink>
                    {
                        ( user.logged )
                            ?   <>
                                    <NavLink className={ ({ isActive }) => 'nav-item nav-link' }
                                        onClick={ handleLogout } to={ urlBaseFrontend }>{ user.logged ? 'Salir' : '' }</NavLink>
                                </>
                            :   <>
                                    <div className="row justify-content-end me-0 me-sm-1">
                                        <ul className="navbar-nav col">
                                            <NavLink className={ ({ isActive }) => 'nav-item nav-link' } data-bs-toggle="modal" data-bs-target="#loginModal" aria-controls="modalBody">
                                                <User color={myColor} height={1.3} width={1.3} strokeWidth={1.5}/>
                                            </NavLink>
                                        </ul>
                                        <ul className="navbar-nav col">
                                            <NavLink onClick={ handleTheme } className={ ({ isActive }) => 'nav-item nav-link' } >
                                                { (theme ==='light') ? <Moon className='main-color' strokeWidth={1.5} height={1.25} width={1.25} /> : <Sun className='main-color' strokeWidth={10} height={1.25} width={1.25} /> }
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
            <Login Logo={Logo} Icon={User} user={user} alertMessage={alertMessage} alertType={alertType} setAlertMessage={setAlertMessage} setAlertType={setAlertType} theme={theme} />
        </>
    )
}