export const HomePlus = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
        <span>
            <svg className={className} stroke={color} fill="none" stroke-width={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2"></path>
                <path d="M16 19h6"></path>
                <path d="M19 16v6"></path>
            </svg>
        </span>
    );
}