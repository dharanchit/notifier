import amqp from 'amqplib';

const notificationServices = ['whatsapp', 'sms', 'email'];

const queueConsumer = async() => {
    try {
        let response = null;
        const connect = await amqp.connect('amqp://localhost:5672');
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
        await channel.consume(q.queue, function(msg){
            console.log('Recieved ', msg.fields.routingKey, msg.content.toString());
            response = msg.content.toString();
        }, {
            noAck: true
        });
        return response;
    } catch(err: any){
        console.error(err);
    }
}

export default queueConsumer;