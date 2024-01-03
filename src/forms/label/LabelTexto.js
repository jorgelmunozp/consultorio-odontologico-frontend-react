import React from 'react'
import './labelTexto.css';

export const LabelTexto = ({ type, text, className }) => {

  const labelTexto = ( 
    (type === 1 && `<h1 className='${ className }'>${ text }</h1>`)||
    (type === 2 && `<h2 className='${ className }'>${ text }</h2>`)||
    (type === 3 && `<h3 className='${ className }'>${ text }</h3>`)||
    (type === 4 && `<p className='${ className }'>${ text }</p>`)||
    (type === 5 && `<span className='${ className }'>${ text }</span>`)
  );

  return (
    <fragment dangerouslySetInnerHTML={{ __html: labelTexto}}></fragment>
  )
}
