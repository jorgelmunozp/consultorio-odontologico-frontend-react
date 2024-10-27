export const CalendarSmile = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
        <span>
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12zm12 -4v4m-8 -4v4m-4 4h16m-9.995 3h.01m3.99 0h.01"></path>
                <path d="M10.005 17a3.5 3.5 0 0 0 4 0"></path>
            </svg>
        </span>
    );
}