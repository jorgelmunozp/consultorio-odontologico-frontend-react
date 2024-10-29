export const Boton = ({ className, style, title, type, children, functionClick }) => {
    return (
      <button
        className={
          (type === 1 && `App-header-tabla-boton ${className}`) ||
          (type === 2 && `App-body-tabla-boton ${className}`) ||
          (type === 3 && `App-footer-tabla-boton ${className}`) ||
          (type === 4 && `${className}`)||
          (type === 5 && `${className}`)
        }
        style={style} onClick={ functionClick }>
        {children || title}
      </button>
    );
  };
