import { createRoot } from 'react-dom/client';
import { Suspense, lazy } from 'react';
import { Logo } from '../src/components/icons/logo/Logo';
import { myColor } from './global';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import './index.css';

const App = lazy(() => import('./App'));

const root = createRoot(document.getElementById('root'));
root.render(
          <Suspense delayMs={0} fallback={<div style={{display:'flex', width:'100%', height:'100vh', alignItems:'center', justifyContent:'center'}}><Logo height={6} width={6} strokeWidth={1} color={myColor} /></div>}>
            <App />
          </Suspense>
);