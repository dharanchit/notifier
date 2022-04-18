import fetchUserInfo from "../dbOps/fetchUserInfo";

const notificationServices = ['whatsapp', 'sms', 'email'];

const publishService = async(medium: string, userEmail: string):Promise<{status: number, message: string}> => {
    const mediumInLowerCase = medium.toLowerCase();
    if(!notificationServices.includes(mediumInLowerCase)){
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
    // publish to queue
    
    return { status: 200, message: 'Published to queue' }
}

export default publishService;