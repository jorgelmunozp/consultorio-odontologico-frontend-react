import { useState, useEffect } from 'react';

export const useTheme = () => {
    const body = document.getElementById('body');
    const storedTheme = localStorage.getItem('theme');                                      // Check localstorage for theme preferences stored
    if( storedTheme && storedTheme !== body.dataset.theme ) { body.dataset.theme = storedTheme }                                  // If exist assign any localstoraged theme

    const [theme, setTheme] = useState( storedTheme ? storedTheme : body.dataset.theme ); // Theme: Light or Dark
    
    /****** Body and Navbar Theme ******/
    // const handleTheme = () => {
    //     switch ( theme ) {
    //         case 'light': body.dataset.theme='dark'; localStorage.setItem('theme', 'dark'); setTheme('dark'); break;
    //         case 'dark': body.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
    //         default: body.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
    //     }
    // }

    const handleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    useEffect(()=>{
        document.body.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    },[theme]);

    return [ theme, handleTheme ]
}