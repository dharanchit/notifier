import amqp from 'amqplib';
import notificationTriggerController from '../controller/notificationTriggerController';

const notificationServices = ['whatsapp', 'sms', 'email'];

const queueConsumer = async() => {
    try {
        const connect = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
        const channel = await connect.createChannel();
        const exchangeName = 'notifications';
        await channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });
        const q = await channel.assertQueue('', {
            exclusive: true
        });
        notificationServices.forEach(async(medium: string) => {
            await channel.bindQueue(q.queue, exchangeName, medium); 
        });
        await channel.consume(q.queue, async function(msg){
            if(msg){
                const notifcationTriggerResponse = await notificationTriggerController(msg);
                // if(notifcationTriggerResponse){
                    // Acknowledge message once response is recieved
                //     channel.ack(msg);
                // }
            }
        }, {
            noAck: true
        });
    } catch(err: any){
        console.error(err);
    }
}

export default queueConsumer;