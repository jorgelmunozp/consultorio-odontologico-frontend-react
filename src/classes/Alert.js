import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

const Modal = lazy(() => import('../components/modal/Modal.js'));
const Logo = lazy(() => import('../components/icons/logo/Logo.js'));
const Success = lazy(() => import('../components/icons/alert/Success.js'));
const Warning = lazy(() => import('../components/icons/alert/Warning.js'));
const Error = lazy(() => import('../components/icons/alert/Error.js'));

export class Alert {
    constructor({ type:type='default',title:title='', message:message='', buttons:buttons='' }) {
        this.type = {type}.type;
        this.title = {title}.title;
        this.message = {message}.message;
        this.buttons = {buttons}.buttons;
    }
   
    launch = () => {
        const icons = {
            default: { Icon:Logo, iconColor:'#5285c5' },
            success: { Icon:Success, iconColor:'#0f0' },
            warning: { Icon:Warning, iconColor:'#f8bb86' },
            error: { Icon:Error, iconColor:'#f00' }
        }

        let isAlert = false;
        document.getElementById('body').childNodes.forEach(child => {                       // Check for any alert element in the body
            if (child.id === 'alert' ) { isAlert = true }
        });

        if( !isAlert ) { document.getElementById('root').insertAdjacentHTML('afterend',`<div id="alert"></div>`); } // Create element Alert in the body if there's no one

        const root = createRoot( document.getElementById('alert') );
        root.render( <Suspense fallback={<></>}><Modal Icon={icons[this.type].Icon} iconColor={icons[this.type].iconColor} title={this.title} fontFamily={'century-gothic'} /></Suspense> );
    }
}