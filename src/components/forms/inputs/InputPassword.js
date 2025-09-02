export const InputPassword = ({ placeholder,value,handleChange,className, theme }) => {
    return (
        <>
            <div className="form-floating text-center text-nowrap text-truncate px-0 shadow-sm" data-mdb-input-init>
                <input type="password" value={ value } onChange={ (target) => handleChange(target) } id="formPassword" placeholder={ placeholder } className={ className + " text-nowrap text-truncate bg-transparent" } autoComplete="off" data-theme={theme} />
                <label htmlFor="formPassword" className="form-label text-nowrap text-truncate bg-transparent" data-theme={theme}>{ placeholder }</label>
            </div>
        </>
    )
}
export default InputPassword;