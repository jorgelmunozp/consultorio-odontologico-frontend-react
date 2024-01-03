export const InputText = ({ placeholder,inputText,onInputChange,className }) => {
    return (
        <>
            <input  
                value={ inputText } onChange={ (target) => onInputChange(target) } 
                placeholder={ placeholder } className={ className }
                type='search' id='inputText' name='inputText' autoComplete='off' 
            />
        </>
    )
}