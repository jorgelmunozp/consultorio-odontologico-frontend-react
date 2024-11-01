export const Boton = ({ type, icon, title, handleClick, style, className }) => {
    return (
      <button
        className={
          (type === 1 && `App-header-button-style ${className}`) ||
          (type === 2 && `App-body-button-style ${className}`) ||
          (type === 3 && `App-footer-button-style ${className}`) ||
          (type === 4 && `${className}`)||
          (type === 5 && `${className}`)
        }
        style={style} onClick={ handleClick }>
        {icon || title}
      </button>
    );
  };
