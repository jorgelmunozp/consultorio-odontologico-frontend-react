import '../views/login/login.css';
import { lazy, memo, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice.js';
import { useThemeContext } from "../../theme/ThemeContext.js";
import { myColor, myTitle } from "../../global.js";

const Logo = memo(lazy(() => import('../icons/logo/Logo.js')));
const User = memo(lazy(() => import('../icons/user/User.js')));
const Moon = memo(lazy(() => import('../icons/theme/Moon.js')));
const Sun = memo(lazy(() => import('../icons/theme/Sun.js')));
const HomeMenu = memo(lazy(() => import('../icons/home/HomeMenu.js')));
const Login = memo(lazy(() => import('../views/login/Login.js')));

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const Navbar = ({ setIsMenuOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme, handleTheme } = useThemeContext();
  const user = useSelector((state) => state.auth.user); // 👈

  const handleLogout = useCallback(() => {
    dispatch(logout()); // 👈
    navigate(urlBaseFrontend, { replace: true });
  }, [dispatch, navigate]);

  const handleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, [setIsMenuOpen]);

  if (process.env.NODE_ENV === 'development') console.log('[Navbar 👇]');

  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-sm navbar-light fixed-top shadow-lg user-select-none z-10000" data-theme={theme}>
        <div className="container-fluid">
          <NavLink className="navbar-brand main-color d-flex bg-transparent" to={"/" + urlBaseFrontend}>
            <Logo color={myColor} width={1.25} height={1.25} strokeWidth={1.2} className='ms-0 ms-sm-4 me-0 me-sm-2 mt-logo' />
            <span className='main-color'>{myTitle}</span>
          </NavLink>
          {user.logged ? (
            <NavLink className="nav-item nav-link" onClick={handleLogout} to={urlBaseFrontend}>
              Salir
            </NavLink>
          ) : (
            <div className="row justify-content-end me-0 me-sm-1">
              <ul className="navbar-nav col">
                <NavLink className="nav-item nav-link" data-bs-toggle="modal" data-bs-target="#login" aria-controls="modalBody">
                  <User color={myColor} height={1.3} width={1.3} strokeWidth={1.5} />
                </NavLink>
              </ul>
              <ul className="navbar-nav col">
                <NavLink onClick={handleTheme} className="nav-item nav-link">
                  {theme === 'light' ? (
                    <Moon className='main-color' strokeWidth={1.5} height={1.25} width={1.25} />
                  ) : (
                    <Sun className='main-color' strokeWidth={10} height={1.25} width={1.25} />
                  )}
                </NavLink>
              </ul>
              <ul className="navbar-nav col">
                <NavLink onClick={handleMenu} className="nav-item nav-link" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody">
                  <HomeMenu color={myColor} height={1.3} width={1.3} strokeWidth={5} />
                </NavLink>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <Login Icon={User} user={user} />
    </>
  );
};

export default memo(Navbar);