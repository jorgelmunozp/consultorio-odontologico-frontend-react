import { AlertClass } from '../../classes/AlertClass';

export const Alert = ({ type, title, message, buttons }) => {
    const MyAlert = new AlertClass({ type:type, title:title, message:message, buttons:buttons })
    return ( MyAlert )
}


