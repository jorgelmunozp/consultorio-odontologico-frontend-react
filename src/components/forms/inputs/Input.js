import '../forms.css';
import sign from 'jwt-encode';                                                  // Para firma con jwt
import { jwtDecode as decode } from "jwt-decode";

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const Input = ({ value, type, placeholder, defaultValue, handleChange, className }) => {
    return (
        <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
            <input type={ type } value={ value !== '' ? sign(value,jwtSecretKey):'' } defaultValue= { defaultValue } onChange={ handleChange } placeholder={ placeholder } className={ className + " text-nowrap text-truncate" } autoComplete="off" />
            {/* <input type={ type } value={ value } defaultValue= { defaultValue } onChange={ handleChange } placeholder={ placeholder } className={ className + " text-nowrap text-truncate" } autoComplete="off" /> */}
            {/* { decode(value) } */}
            { value }
            <label htmlFor={ placeholder+'Input' } className="form-label text-muted text-nowrap text-truncate" >{ placeholder }</label>
        </div>
    )
}