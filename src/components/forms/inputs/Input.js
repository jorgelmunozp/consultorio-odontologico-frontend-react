import '../forms.css';
import { useState } from 'react';
import sign from 'jwt-encode';                                                  // Para firma con jwt
import { jwtDecode as decode } from "jwt-decode";
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const Input = ({ type, placeholder, defaultValue, handleChange, className }) => {
    let [value, setValue] = useState( defaultValue );

    return (
        <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
            <input type={ type } value={ value } onChange={ (event) => { setValue(event.target.value); handleChange( sign(event.target.value,jwtSecretKey) ) } } placeholder={ placeholder } className={ className + " text-nowrap text-truncate" } autoComplete="off" />
            <label htmlFor={ placeholder+'Input' } className="form-label text-muted text-nowrap text-truncate" >{ placeholder }</label>
        </div>
    )
}