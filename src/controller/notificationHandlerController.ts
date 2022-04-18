import { Request, Response } from "express";
import notificationHandlerService from "../services/notificationHandlerService";

const notificationHandlerController = async(req: Request, res: Response) => {
    try {
        // messages checks
        const notificationHandlerServiceResponse = await notificationHandlerService();
        return res.status(notificationHandlerServiceResponse.status).send({ message: notificationHandlerServiceResponse.message })
    } catch(err: any){
        console.error(err);
        return res.status(500).send({ message: `Error occurred while consuming the request ${err}` });
    }
}

export default notificationHandlerController;