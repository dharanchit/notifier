import { Response, Request } from "express";
import publishService from "../services/publishService";

const publishController = async(req: Request, res: Response) => {
    try {
        const { medium, userEmail } = req.body;
        if(!medium || !userEmail) {
            return res.status(400).send({ message: 'Incomplete information passed' });
        }
        const publishServiceResponse = await publishService(medium, userEmail);
        return res.status(publishServiceResponse.status).send({ message: publishServiceResponse.message });
    } catch(err: any){
        console.error(err);
        return res.status(500).send({ message: `Error occurred while publishing to queue. ${err}` });
    }
}

export default publishController;