export const HomeDelete = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
            <svg className={className} stroke={color} fill="none" strokeWidth={strokeWidth} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13.4v-1.4h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2c.402 0 .777 .119 1.091 .323"></path>
                <path d="M21.5 21.5l-5 -5"></path>
                <path d="M16.5 21.5l5 -5"></path>
            </svg>
    );
}
export default HomeDelete;