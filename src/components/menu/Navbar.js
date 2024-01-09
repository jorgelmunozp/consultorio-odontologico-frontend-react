import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Logo } from '../icons/logo/LogoThick';
import { HomeMenu } from '../icons/home/HomeMenu';

export const Navbar = ({urlBaseFrontend, myColor, myTitle}) => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate((urlBaseFrontend + '/index'), { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg user-select-none">
            <div className="container-fluid">
                <NavLink to={"/" + urlBaseFrontend + "/index"}>
                    <Logo color={myColor} width={1.5} height={1.5} strokeWidth={1.5} className='navbar-brand ms-3 me-0'/>
                </NavLink>
                <NavLink className="navbar-brand" to={"/" + urlBaseFrontend + "/index"}>
                    <span className='main-color'>{ myTitle }</span>
                </NavLink>

                <button className="btn btn-light main-color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody">
                    <HomeMenu color={myColor} height={1.3} width={1.3} strokeWidth={5}/>
                </button>
            </div>
        </nav>
    )
}