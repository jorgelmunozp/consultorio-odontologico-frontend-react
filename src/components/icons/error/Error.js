export const Error = ({ color='currentColor', className='', strokeWidth='0', width='1', height='1'}) => {
  return (
      <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 256 256" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
        <path d="M162.83,98.83,133.66,128l29.17,29.17a4,4,0,0,1-5.66,5.66L128,133.66,98.83,162.83a4,4,0,0,1-5.66-5.66L122.34,128,93.17,98.83a4,4,0,0,1,5.66-5.66L128,122.34l29.17-29.17a4,4,0,1,1,5.66,5.66ZM228,128A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"></path>
      </svg>
  )
}
