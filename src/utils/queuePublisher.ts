import amqp from 'amqplib';

const pushToQueue = async(message: string, medium: string) => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();
        const exchangeName = 'notifications';
        await channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });
        channel.publish(exchangeName, medium, Buffer.from(message));
        console.log(`Message published to ${medium} ${exchangeName} ${message}`);
    } catch(err: any){
        console.error(err);
    }
}

export default pushToQueue;