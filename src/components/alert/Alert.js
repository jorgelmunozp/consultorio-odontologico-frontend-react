import { AlertClass } from '../../classes/AlertClass';

export const Alert = ({ type }) => {
    const MyAlert = new AlertClass({ type:type })
    return ( MyAlert )
}


