import { Suspense, lazy, memo, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/icons/logo/Logo.js';
import { AppAlerts } from "./alerts/AlertContext.js"; // 👈 Importa el provider
import { AppTheme } from './theme/ThemeContext.js';
import { myColor } from './global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

const MemoLogo = memo(Logo);                // Memorized logo to avoid re-renders

const preloadApp = import('./App.js');      // Preload app
const App = memo( lazy(() => preloadApp) );

// 👇 Fallback memorizado
const FallbackView = memo(() => {
  // Memoriza estilo para evitar recreación en cada render
  const style = useMemo( () => ({ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", animation: "splash 0.75s linear infinite" }), [] );
  return ( <AppTheme isBackground={true}><div style={style}><MemoLogo height={10} width={10} strokeWidth={1} color={myColor} /></div></AppTheme> );
});

const root = createRoot(document.getElementById('root'));
root.render( 
<Suspense fallback={<FallbackView />}>
    <AppTheme>
      <AppAlerts>
        <App />
      </AppAlerts>
    </AppTheme>
</Suspense> );

if( process.env.NODE_ENV === 'development' ) { console.log('[Index 👇]') }