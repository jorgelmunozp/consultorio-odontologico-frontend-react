import React from 'react'
import './labelTexto.css';

export const LabelTexto = ({ type, text, className }) => {

  const labelTexto = ( 
    (type === 1 && `<h1 class='${ className }'>${ text }</h1>`)||
    (type === 2 && `<h2 class='${ className }'>${ text }</h2>`)||
    (type === 3 && `<h3 class='${ className }'>${ text }</h3>`)||
    (type === 4 && `<p class='${ className }'>${ text }</p>`)||
    (type === 5 && `<span class='${ className }'>${ text }</span>`)
  );

  return (
    <fragment dangerouslySetInnerHTML={{ __html: labelTexto}}></fragment>
  )
}
