export const StethoscopeLight = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1"></path><path d="M8 15a6 6 0 1 0 12 0v-3"></path>
                <path d="M11 3v2"></path>
                <path d="M6 3v2"></path>
                <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            </svg>
    );
}