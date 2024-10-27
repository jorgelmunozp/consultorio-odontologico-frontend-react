export const UserInjured = ({ color='currentColor', className='', strokeWidth='1', width='1', height='1'}) => {
    return (
        <span>
            <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 32 32" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M 16 5 C 12.1 5 9 8.1 9 12 C 9 14.434941 10.207417 16.557098 12.064453 17.808594 C 8.8381824 19.182033 6.4630116 22.193688 6.0996094 25.900391 C 5.9996094 26.400391 6.1996094 27.000391 6.5996094 27.400391 C 6.8996094 27.800391 7.5 28 8 28 L 17 28 C 18.7 28 20 26.7 20 25 C 20 23.3 18.7 22 17 22 L 13.191406 22 L 12.394531 19.875 C 13.483209 19.317228 14.708992 19 16 19 C 20.4 19 24 22.6 24 27 L 26 27 C 26 22.893276 23.490404 19.345194 19.929688 17.810547 C 21.788754 16.559368 23 14.436508 23 12 C 23 8.1 19.9 5 16 5 z M 16 7 C 16.418858 7 16.818429 7.0631437 17.205078 7.15625 L 13.650391 10 L 11.40625 10 C 12.165345 8.221166 13.915213 7 16 7 z M 19.175781 8.140625 C 19.783309 8.6384382 20.279591 9.263812 20.59375 10 L 16.851562 10 L 19.175781 8.140625 z M 11 12 L 21 12 C 21 14.8 18.8 17 16 17 C 13.2 17 11 14.8 11 12 z M 10.695312 21.041016 L 12.554688 26 L 8.0996094 26 C 8.3469897 24.020957 9.3067175 22.288259 10.695312 21.041016 z M 13.941406 24 L 17 24 C 17.6 24 18 24.4 18 25 C 18 25.6 17.6 26 17 26 L 14.691406 26 L 13.941406 24 z"></path>
            </svg>

            {/* <svg className={className} stroke={color} fill={color} strokeWidth={strokeWidth} viewBox="0 0 24 24" height={height + 'em'} width={width + 'em'} xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6.39 8.56C16.71 11.7 14.53 11 12 11s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 4 15.22V22h2v-6.78c0-.38.2-.72.52-.88C7.71 13.73 9.63 13 12 13c.76 0 1.47.07 2.13.2l-1.55 3.3H9.75C8.23 16.5 7 17.73 7 19.25S8.23 22 9.75 22H18c1.1 0 2-.9 2-2v-4.78c0-1.12-.61-2.15-1.61-2.66zM10.94 20H9.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.89l-.7 1.5zM18 20h-4.85l2.94-6.27c.54.2 1.01.41 1.4.61.31.16.51.5.51.88V20z"></path>
            </svg> */}
        </span>
    );
}