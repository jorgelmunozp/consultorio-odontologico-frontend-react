
export class Alert {
    constructor({ title:title='', message:message='', buttons:buttons='' }) {
        this.title = {title}.title;
        this.message = {message}.message;
        this.buttons = {buttons}.buttons;
    }

    getAlert = () => {                                               // METHOD ALERT
        const [alert, setAlert] = useState(false);

        return({ alert, setAlert })
    }         
    get alert () { return this.getAlert() }                          // Getter alert

}