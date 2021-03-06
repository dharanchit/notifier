import fetchUserInfo from "../dbOps/fetchUserInfo";
import pushToQueue from "../utils/queuePublisher";

// Inorder to do new notification integration, add it to allowedNotificationServices array
// Increase stabilty and discards random notification type
const allowedNotificationServices = ['whatsapp', 'sms', 'email'];

const publishService = async(medium: string, userEmail: string):Promise<{status: number, message: string}> => {
    const mediumInLowerCase = medium.toLowerCase();
    if(!allowedNotificationServices.includes(mediumInLowerCase)){
        return { status: 400, message: `Notification medium ${medium} does not exists` }
    }
    const userInfo = await fetchUserInfo(userEmail);
    if(!userInfo){
        return { status: 404, message: `User associated with email ${userEmail} not found` }
    }

    // if user has unsubscribed, dont push the notification to queue
    if(userInfo.hasunsubscribed){
        return { status: 200, message: `User ${userEmail} has unsubscribed from services` }
    }

    // Construct notification object
    const notificationObject = {
        medium: mediumInLowerCase,
        email: userEmail,
        phone: userInfo.phone,
        name: userInfo.name
    }

    // publish to queue
    await pushToQueue(JSON.stringify(notificationObject), medium);
    return { status: 200, message: 'Published to queue' }
}

export default publishService;