import '../forms.css';

export const Input = ({ value, type, placeholder, defaultValue, onChange, className }) => {
    return (
        <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
            <input type={ type } value={ value } defaultValue= { defaultValue } onChange={ onChange } placeholder={ placeholder } className={ className + " text-nowrap text-truncate" } autoComplete="off" />
            <label htmlFor={ placeholder+'Input' } className="form-label text-muted text-nowrap text-truncate" >{ placeholder }</label>
        </div>
    )
}