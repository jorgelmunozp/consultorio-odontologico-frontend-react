export const HearthEdit = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.21 5.697"></path>
                <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M19.001 15.5v1.5"></path><path d="M19.001 21v1.5"></path>
                <path d="M22.032 17.25l-1.299 .75"></path>
                <path d="M17.27 20l-1.3 .75"></path>
                <path d="M15.97 17.25l1.3 .75"></path>
                <path d="M20.733 20l1.3 .75"></path>
            </svg>
    );
}