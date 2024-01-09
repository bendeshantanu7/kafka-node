const {Kafka} = require('kafkajs');
const message = process.argv[2]

async function init() {
    try {
        const kafka =new Kafka({
            "clientId": "myKafkaApp",
            "brokers": ["192.168.1.3:9092"]
        })

        console.log(message)
        console.log('bin path', process.argv)
        const partition = message[0] < "N" ? 0 : 1        
        console.log(partition)
        const producer = kafka.producer({

        });
        console.log('Connecting')
        await producer.connect()
        console.log('Connected')
        await producer.send({
            topic: 'Users',
            messages: [
                {
                    value: message,
                    partition: partition
                }
            ]
        })
        console.log('Message sent')

        await producer.disconnect()

    } catch (e) {

    }
}

init()