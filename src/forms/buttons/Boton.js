export const Boton = ({ className, style, title, type, children, functionClick }) => {
    return (
      <button
        className={
          (type === 1 && `App-body-tablaX2-tablilla5-boton ${className}`) ||
          (type === 2 && `App-body-tabla3-verPolizas ${className}`) ||
          (type === 3 && `App-header-tabla-boton ${className}`) ||
          (type === 4 && `${className}`)||
          (type === 5 && `${className}`)
        }
        style={style} onClick={ functionClick }>
        {children || title}
      </button>
    );
  };
