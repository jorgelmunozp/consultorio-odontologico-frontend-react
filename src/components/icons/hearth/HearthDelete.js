export const HearthDelete = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 12.572l-.5 .428m-6 6l-1 1l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                <path d="M22 22l-5 -5"></path>
                <path d="M17 22l5 -5"></path>
            </svg>
    );
}