import { useState, useEffect, useCallback, useMemo } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    useEffect(() => { localStorage.setItem("theme", theme) }, [theme]);

    // 👇 Referencia estable con useCallback para evitar recrear la función en cada render
    const handleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    // 👇 Memoriza el resultado para evitar recrearlo en cada render
    return useMemo(() => [theme, handleTheme], [theme, handleTheme]);
}