import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/icons/logo/Logo.js';
import { myColor } from './global.js';
import { background } from './components/banners/background/background.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';

const preloadApp = import('./App.js');
const App = lazy(() => preloadApp);

const root = createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div style={{ backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundRepeat: 'repeat', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}><div style={{display:'flex', height:'100vh', width:'100%', alignItems:'center', justifyContent:'center', animation:'splash 0.75s linear infinite' }}><Logo height={10} width={10} strokeWidth={1} color={myColor} /></div></div>}>
    <App Logo={Logo} />
  </Suspense>
);