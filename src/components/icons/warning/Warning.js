export const Warning = ({ color='currentColor', className='', strokeWidth='0', width='1', height='1'}) => {
  return (
    <span>
        {/* <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 256 256" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
            <path d="M128,28A100,100,0,1,0,228,128,100.11,100.11,0,0,0,128,28Zm0,192a92,92,0,1,1,92-92A92.1,92.1,0,0,1,128,220Zm-4-84V80a4,4,0,0,1,8,0v56a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,172Z"></path>
        </svg> */}
        <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 512 512" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
          <path fill="none" strokeMiterlimit="10" strokeWidth="28" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path>
          <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="28" d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 00-5.79-6h0a5.74 5.74 0 00-5.68 6z"></path>
          <path d="M256 367.91a20 20 0 1120-20 20 20 0 01-20 20z"></path>
        </svg>
    </span>
  )
}
