import { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';

const Modal = lazy(() => import('../components/modal/Modal.js'));
const Logo = lazy(() => import('../components/icons/logo/Logo.js'));
const Success = lazy(() => import('../components/icons/alert/Success.js'));
const Warning = lazy(() => import('../components/icons/alert/Warning.js'));
const Error = lazy(() => import('../components/icons/alert/Error.js'));

export class Alert {
    constructor({ type='default',title='', message='', buttons='' }) {
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

        if( !document.getElementById('modal') ) { document.getElementById('root').insertAdjacentHTML('afterend',`<div id="modal"></div>`); } // Create element Alert in the body if there's no one

        const root = createRoot( document.getElementById('modal') );
        // root.render( <Suspense fallback={<></>}><Modal Icon={icons[this.type].Icon} iconColor={icons[this.type].iconColor} title={this.title} fontFamily={'century-gothic'} /></Suspense> );
        root.render( <Modal Icon={icons[this.type].Icon} iconColor={icons[this.type].iconColor} title={this.title} fontFamily={'century-gothic'} /> );

        // let modalContainer = document.getElementById('modal');
        // if (!modalContainer) {
        //     modalContainer = document.createElement('div');
        //     modalContainer.id = 'modal';
        //     document.body.appendChild(modalContainer);
        // }

        // const { Icon, iconColor } = icons[this.type];

        // // Usamos createPortal para inyectar el modal fuera del root
        // createPortal(
        //     <Suspense fallback={<></>}>
        //         <Modal
        //             Icon={Icon}
        //             iconColor={iconColor}
        //             title={this.title}
        //             fontFamily={'century-gothic'}
        //         />
        //     </Suspense>,
        //     modalContainer
        // );


    }
}