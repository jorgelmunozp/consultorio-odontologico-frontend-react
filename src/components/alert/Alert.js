import { Alert as AlertClass } from '../../classes/Alert.js';

export const Alert = ({ type, title, message, buttons }) => {
    return ( new AlertClass({ type:type, title:title, message:message, buttons:buttons }) )
}
