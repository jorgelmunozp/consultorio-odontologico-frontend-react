import { createRoot } from 'react-dom/client';
import { Modal } from '../components/modal/Modal';
import { Success } from '../components/icons/success/Success';
import { Warning } from '../components/icons/warning/Warning';
import { Error } from '../components/icons/error/Error';

export class AlertClass {
    constructor({ type:type='',title:title='', message:message='', buttons:buttons='' }) {
        this.type = {type}.type;
        this.title = {title}.title;
        this.message = {message}.message;
        this.buttons = {buttons}.buttons;
    }
   
    launch = () => {
        const icons = {
            success: { Icon:Success, iconColor:'#0f0' },
            warning: { Icon:Warning, iconColor:'#f8bb86' },
            error: { Icon:Error, iconColor:'#f00' }
        }

        document.getElementById('body').insertAdjacentHTML('afterend',`<div id="alert"></div>`);
        const root = createRoot( document.getElementById('alert') );
        root.render( <Modal Icon={icons[this.type].Icon} iconColor={icons[this.type].iconColor} title={this.title} fontFamily={'century-gothic'} /> );
    }

}