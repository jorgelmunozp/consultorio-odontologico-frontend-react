import { useState } from "react";
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
    
    getStatus = () => {                                                 // METHOD STATUS
        const [open, setOpen] = useState(false);                        // Input alert status
        
        return({ open, setOpen })
    }      
    get status () { return this.getStatus() }                          // Getter state

    fire = () => {
        let Icon = '';
        let iconColor = '';
        let title = '';
        switch ( this.type ) { 
          case 'success': Icon=Success; iconColor='#0f0'; break;
          case 'warning': Icon=Warning; iconColor='#f8bb86'; break;
          case 'error': Icon=Error; iconColor='#f00'; break;
          case 'errorFetch': Icon=Error; iconColor='#f00'; title='Error en la conexión con el servidor'; break;
        }
        const root = createRoot(document.getElementById('root'));
        root.render(
            <Modal Icon={Icon} iconColor={iconColor} title={this.title} open={this.type} setOpen={''} />
        );
    }
    get show () { return this.fire() }                          // Getter state


}