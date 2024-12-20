export const CalendarEdit = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
                <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                <path d="M15 3v4"></path><path d="M7 3v4"></path>
                <path d="M3 11h16"></path>
                <path d="M18 16.496v1.504l1 1"></path>
            </svg>
    );
}