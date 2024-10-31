import '../forms.css';

export const Input = ({ property, className }) => {
    if( property !== undefined ){
        return (
            <div className="form-floating text-center text-nowrap text-truncate shadow-sm" data-mdb-input-init>
                <input type={ property.type } value={ property.value } onChange={ property.handleChange } id={ property.key+'Input' } placeholder={ property.key.charAt(0).toUpperCase() + property.key.slice(1) } className={ className + " text-nowrap text-truncate" } autoComplete="off" />
                <label htmlFor={ property.key+'Input' } className="form-label text-muted text-nowrap text-truncate" >{ property.key.charAt(0).toUpperCase() + property.key.slice(1) }</label>
            </div>
        )
    }

}