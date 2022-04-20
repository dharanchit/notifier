import { MessageStructure } from "../../types";

const axios = require('axios').default;
require('dotenv').config();

const triggerSMSNotification = async(message:string): Promise<string> => {
    try {
        const parsedMessage: MessageStructure = JSON.parse(message);
        const response = await axios.post("https://api.twilio.com/2010-04-01/Accounts/AC24353c450a4bb045f641de6e12e3fd3e/Messages.json", {
            "Body": "Hello from Twilio",
            "From": "+19896144693",
            "To": parsedMessage.phone
        }, {
            headers: {
                "AC24353c450a4bb045f641de6e12e3fd3e": process.env.TWILIO_AUTH_TOKEN
            }
        });
        if(response.status === 200){
            console.log('Triggered SMS');
            return 'Triggered sms notification';
        }
    } catch(err){
        console.error(err);
        return '';
    }
}

export default triggerSMSNotification;