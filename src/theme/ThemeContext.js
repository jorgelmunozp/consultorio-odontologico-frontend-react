import { memo, createContext, useContext, useMemo, useRef, useEffect } from "react";
import { useTheme } from './useTheme.js';
import { background } from '../components/banners/background/background.js';
import { darkColor, lightColor } from "../global.js";

export const ThemeContext = createContext();

export const AppTheme = memo( ({ children, isBackground }) => {
  const [theme, handleTheme] = useTheme();

  // 👇 Memoriza los valores de colores para evitar recálculo en cada render
  const { bgColor, textColor } = useMemo(() => {
    return { bgColor: theme === "dark" ? darkColor : lightColor,
             textColor: theme === "dark" ? lightColor : darkColor
           };
  }, [theme]);

  // 👇 Memoriza la imagen de fondo
  const backgroundImage = useMemo(() => isBackground ? `url(${background})` : "", [isBackground]);

  const valueThemeContext = useMemo(() => ({ theme, handleTheme }), [theme, handleTheme]);

  if( process.env.NODE_ENV === 'development' ) { console.log('[App Theme 🏳️‍🌈]') }
 
  return (
    <ThemeContext.Provider value={valueThemeContext}>
      {/* <div id="app-theme-root" style={{ backgroundColor:bgColor, color:textColor, backgroundImage, backgroundPosition:"center", backgroundRepeat:"repeat", display:"flex", flexDirection:"column", alignItems:'center', minHeight:"100vh", minWidth:"100vw", opacity:0.75, animation:"fadeIn 0.3s ease-out forwards" }}> */}
      <div id="app-theme-root" style={{ backgroundColor:bgColor, color:textColor, backgroundImage, backgroundPosition:"center", backgroundRepeat:"repeat", display:"flex", flexDirection:"column", alignItems:'center', minHeight:"100vh", minWidth:"100vw", opacity:0.75, animation:"fadeIn 0.3s ease-out forwards", position:'relative', zIndex:1055 }}>
          { children }
      </div>
    </ThemeContext.Provider>
  );
}, (prev, next) => prev.isBackground === next.isBackground);

export default AppTheme;

// 👇 Hook para consumir el contexto más fácilmente
export const useThemeContext = () => useContext(ThemeContext);