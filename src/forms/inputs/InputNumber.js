import { NumericFormat } from 'react-number-format';

export const InputNumber = ({ limit,value,name,onInputChange }) => { 
    console.log(value)
    return (
        <>
            <NumericFormat value={ value } name={ name } placeholder={ 'Precio ' + limit } 
                           onValueChange={ (values)=> onInputChange(values) } 
                           prefix={ '$ ' } thousandSeparator={ true } autoComplete='off'
                           className='form-control border-secondary text-muted text-center py-1 w-100' />         
        </>
    )
}
