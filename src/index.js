import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '../src/components/icons/logo/Logo.js';
import { myColor } from './global.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

// const App = lazy(() => import('./App'));
const preloadApp = import('./App.js'); // Preload the App component to improve initial load time
const App = lazy(() => preloadApp);

const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div style={{display:'flex', height:'100vh', width:'100%', alignItems:'center', justifyContent:'center', animation:'splash 0.75s linear infinite' }}><Logo height={10} width={10} strokeWidth={1} color={myColor} /></div>}>
    <App Logo={Logo} />
  </Suspense>
);