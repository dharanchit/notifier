import notificationHandlerService from "../services/notificationHandlerService";

const notificationTriggerController = async(message: any): Promise<string> => {
    try {
        const msgToUTF = message.content.toString();
        const notificationHandlerServiceResponse = await notificationHandlerService(msgToUTF);
        return notificationHandlerServiceResponse;
    } catch(err: any){
        console.error(err);
        return '';
    }
}

export default notificationTriggerController;