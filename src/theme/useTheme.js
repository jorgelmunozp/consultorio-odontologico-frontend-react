import { useState, useEffect, useCallback, useMemo } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => { localStorage.setItem("theme", theme) }, [theme]);
    
    /****** Body and Navbar Theme ******/
    // const handleTheme = () => {
    //     switch ( theme ) {
    //         case 'light': body.dataset.theme='dark'; localStorage.setItem('theme', 'dark'); setTheme('dark'); break;
    //         case 'dark': body.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
    //         default: body.dataset.theme='light'; localStorage.setItem('theme', 'light'); setTheme('light'); break;
    //     }
    // }

    // 👇 Referencia estable con useCallback para evitar recrear la función en cada render
    const handleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    console.log('UseTheme')

    // 👇 Memoriza el resultado para evitar recrearlo en cada render
    return useMemo(() => [theme, handleTheme], [theme, handleTheme]);
}