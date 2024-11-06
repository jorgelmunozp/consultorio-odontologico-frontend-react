import { AlertClass } from '../../classes/AlertClass';
import { createRoot } from 'react-dom/client';
import { Modal } from '../modal/Modal';
import { Success } from '../icons/success/Success';
import { Warning } from '../icons/warning/Warning';
import { Error } from '../icons/error/Error';

export const Alert = ({ type, title, message, buttons }) => {
    const MyAlert = new AlertClass({ type:type, title:title, message:message, buttons:buttons })

    const icons = {
        success: { Icon:Success, iconColor:'#0f0' },
        warning: { Icon:Warning, iconColor:'#f8bb86' },
        error: { Icon:Error, iconColor:'#f00' }
    }

    return ( MyAlert )
}


