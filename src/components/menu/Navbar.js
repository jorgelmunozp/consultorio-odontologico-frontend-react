import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { Logo } from '../icons/logo/Logo';
import { Home } from '../icons/home/Home';

export const Navbar = ({urlBaseFrontend, myColor, myTitle}) => {

    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: types.logout });
        navigate('/index', { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top shadow-lg user-select-none">
            <div className="container-fluid">
                <Logo color={myColor} height={1.5} width={1.5} className='ms-3'/>
                <Link className="navbar-brand main-color ps-2" to={"/" + urlBaseFrontend + "/index"} >{ myTitle }</Link>
                <div className="navbar-collapse d-none"  id="navbarContent">
                    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                    </div>
                </div>
                <button className="btn btn-light main-color" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBody" aria-controls="offcanvasBody"><Home color={myColor} height={1.5} width={1.5}/></button>
            </div>
        </nav>
    )
}