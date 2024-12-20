export const HomeMenu = ({ color='currentColor', className='', strokeWidth='0', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 256 256" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M216.13,106.72l-80-75.54-.05-.05a12,12,0,0,0-16.2.05L39.93,106.67A12,12,0,0,0,36,115.54V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V115.54A12,12,0,0,0,216.13,106.72ZM212,208a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V115.54a4.09,4.09,0,0,1,1.36-3L125.3,37.05a4,4,0,0,1,5.36,0l80,75.55a4,4,0,0,1,1.31,3Z"></path>
            </svg>
    );
}