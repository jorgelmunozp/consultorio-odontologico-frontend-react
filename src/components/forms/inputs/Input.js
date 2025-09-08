import '../forms.css';
import { useThemeContext } from '../../../theme/ThemeContext.js';
import sign from 'jwt-encode';                                                  // Para firma con jwt

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const Input = ({ type='', placeholder='', value='', handleChange, className='' }) => {
    const { theme } = useThemeContext();       // 👈 Call the global theme

    return (
        <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
            <input type={ type } value={ value } onChange={ (event) => { handleChange( sign(event.target.value,jwtSecretKey) ) } } id={ placeholder+'Input' } placeholder={ placeholder } className={ className + " text-nowrap text-truncate bg-transparent" } autoComplete="off" data-theme={theme}/>
            <label htmlFor={ placeholder+'Input' } className="form-label text-nowrap text-truncate bg-transparent" data-theme={theme}>{ placeholder }</label>
        </div>
    )
}
export default Input;