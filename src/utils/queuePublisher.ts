import amqp from 'amqplib';

const pushToQueue = async(message: string, medium: string) => {
    try {
        const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
        const channel = await connection.createChannel();
        const exchangeName = 'notifications';

        // On close of connection remove everything on queue
        await channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });

        // Convert stringified message to buffer and publish to queue 
        channel.publish(exchangeName, medium, Buffer.from(message));
        console.log(`Message published to ${medium} ${exchangeName} ${message}`);
    } catch(err: any){
        console.error(err);
    }
}

export default pushToQueue;