import { MessageStructure } from "../types";
import triggerEmailNotification from "./notificationServices/triggerEmailNotification";
import triggerSMSNotification from "./notificationServices/triggerSMSNotification";
import triggerWhatsappNotification from "./notificationServices/triggerWhatsappNotification";

const pickNotificationService = async(medium: string, message:string): Promise<any> => {
    switch (medium) {
        case "whatsapp":
            return triggerWhatsappNotification(message);
        case "sms":
            return await triggerSMSNotification(message);
        case "email":
            return await triggerEmailNotification(message);
        default:
            return '';
    }
}

const notificationHandlerService = async(message:string):Promise<string> => {
    const parsedMessage:MessageStructure = JSON.parse(message);
    const messageServiceResponse = await pickNotificationService(parsedMessage.medium, message);
    return messageServiceResponse;
}

export default notificationHandlerService;