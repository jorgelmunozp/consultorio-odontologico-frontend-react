import '../forms.css';
import { memo, useCallback } from 'react';
import { useThemeContext } from '../../../theme/ThemeContext.js';
import sign from 'jwt-encode';                                                  // Para firma con jwt

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const Input = memo(({ type='', placeholder='', value='', handleChange, className='' }) => {
    const { theme } = useThemeContext();       // 👈 Call the global theme

    // 👇 Memoriza el handler para no recrearlo en cada render
    const handleInputChange = useCallback((event) => handleChange(sign(event.target.value, jwtSecretKey)), [handleChange]); // 👈 depende de handleChange, así no se rompe

    const inputId = placeholder + 'Input'; // 👈 calculado una sola vez por render

    return (
        <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
            <input type={ type } value={ value } onChange={ handleInputChange } id={ inputId } placeholder={ placeholder } className={ className + " text-nowrap text-truncate bg-transparent" } autoComplete="off" data-theme={theme}/>
            <label htmlFor={ placeholder+'Input' } className="form-label text-nowrap text-truncate bg-transparent" data-theme={theme}>{ placeholder }</label>
        </div>
    )
});

export default memo(Input);

// export default memo(Input, (prev, next) => 
//   prev.type === next.type &&
//   prev.placeholder === next.placeholder &&
//   prev.value === next.value &&
//   prev.className === next.className
// );