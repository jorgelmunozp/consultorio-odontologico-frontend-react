import { Component, useState } from "react";
import { Modal } from '../components/modal/Modal';
import { Success } from '../components/icons/success/Success';
import { Warning } from '../components/icons/warning/Warning';
import { Error } from '../components/icons/error/Error';

export class Alert extends Component {
    // constructor({ type:type='',title:title='', message:message='', buttons:buttons='' }) {
    //     this.type = {type}.type;
    //     this.title = {title}.title;
    //     this.message = {message}.message;
    //     this.buttons = {buttons}.buttons;
    // }

    // getState = () => {                                               // METHOD STATE
    //     const [alert, setAlert] = useState(false);                   // Input alert state
    //     const state = [
    //       { key:'alert', value: alert, type:'XXX', setState: setAlert, handleChange: (event) => setAlert( event.target.value ) },
    //     ];
        
    //     // return( state )
    //     return({ alert, setAlert })
    // }      
    // get state () { return this.getState() }                          // Getter state

    // getAlert = ({ type:type, setOpen:setOpen, title:title, content:content, buttons:buttons }) => {                                               // METHOD ALERT
    //     // const [alert, setAlert] = useState(false);                   // Input alert state

    //     document.getElementById('body').classList.add('noScroll');

    //     let Icon = '';
    //     let iconColor = '';
    //     switch (type) { 
    //         case 'success' : Icon = Success; iconColor = '#0f0'; break;
    //         case 'warning': Icon = Warning; iconColor = '#f8bb86'; break;
    //         case 'error': Icon = Error; iconColor = '#f00'; break;
    //       }

    //     return(
    //         <>
    //         <div className={'modalContainer'}>
    //             <div className={'modalBox'}>
    //             <div className={'modalHeader'}>
    //                 <center><Icon color={iconColor} height={5.5} width={5.5} className={'modalIcon center mt-4'} /></center>
    //                 <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
    //             </div>
    //                 {
    //                 content ? <div className={'modalContent'}>
    //                             <center><h3>{ content }</h3></center>
    //                             </div>
    //                         : ''
    //                 }
    //             <div className={'modalFooter'}>
    //                 <div className={'d-grid w-100'}>
    //                     {
    //                         buttons === 1 ? <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
    //                     : buttons === 2 ? <>
    //                                         <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
    //                                         <button className={'cancelBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Cancel</button>
    //                                         </>
    //                     : ""
    //                     }
    //                 </div>
    //             </div>
    //             </div>
    //         </div>
    //         <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
    //         </>
    //     )
    // }         
    // get alert () { return this.getAlert() }                          // Getter alert



    // fire = ({ type:type='success', title:title='Hi', content:content='', buttons:buttons=1 }) => {   // METHOD ALERT
    //     document.getElementById('body').classList.add('noScroll');

    //     const [open, setOpen] = useState(false);                   // Input alert state

    //     let Icon = '';
    //     let iconColor = '';
    //     switch (type) { 
    //         case 'success' : Icon = Success; iconColor = '#0f0'; break;
    //         case 'warning': Icon = Warning; iconColor = '#f8bb86'; break;
    //         case 'error': Icon = Error; iconColor = '#f00'; break;
    //       }

        
    // }         

    state = {
        alert: 'false',
        setAlertX: () => {
            this.setState({
                alert: 'success'
            })
        }
    };

    // handleChange = () => {
    //     this.setState({
    //         alert: 'success',
    //         handleChange: this.handleChange
    //     });
    // }

    getState = () => {
        return ( this.state )
    }
    get stateAlert () { return this.getState() }                              // Getter data

    render() {
        return(
            <>{ this.state.alert === 'success' && <h1>success!</h1> }</>
            

            // <>
            // <div className={'modalContainer'}>
            //     <div className={'modalBox'}>
            //     <div className={'modalHeader'}>
            //         <center><Icon color={iconColor} height={5.5} width={5.5} className={'modalIcon center mt-4'} /></center>
            //         <h3 className={'modalTitle main-color pt-3'}>{ title }</h3>
            //     </div>
            //         {
            //         content ? <div className={'modalContent'}>
            //                     <center><h3>{ content }</h3></center>
            //                     </div>
            //                 : ''
            //         }
            //         <div className={'modalFooter'}>
            //             <div className={'d-grid w-100'}>
            //                 {   buttons === 1 ? <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
            //                   : buttons === 2 ? <>
            //                                     <button className={'aceptBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Aceptar</button>
            //                                     <button className={'cancelBtn'} onClick={() => { setOpen(false); document.getElementById('body').classList.remove('noScroll'); }}>Cancel</button>
            //                                     </>
            //                 : ""}
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
            // </>
        )
    }
}