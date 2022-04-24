import { MessageStructure } from "../../types";
require('dotenv').config();
const nodemailer = require("nodemailer");

const triggerEmailNotification = async(message: string): Promise<string> => {
    try {
        const testAccount = await nodemailer.createTestAccount({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: testAccount.user,
            pass: testAccount.pass,
            },
        });
        const parsedMessage:MessageStructure = JSON.parse(message);
        let info = await transporter.sendMail({
            from: testAccount.email,
            to: parsedMessage.email,
            subject: "Hello ✔", 
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
        console.log("Message sent: %s", info.messageId);
        return 'Triggered email notification';
    } catch(err: any){
        console.error(err);
        return '';
    }
}

export default triggerEmailNotification;