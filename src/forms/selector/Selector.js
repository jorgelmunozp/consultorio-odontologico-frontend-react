export const Selector = ({ items,className='' }) => {
    return (
        <select className={ className }>
            { items.map( item => {
                return( <option value={ item }>{ item }</option> )
              })            
            }
        </select>
    )
}

