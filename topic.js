const {Kafka} = require("kafkajs")

const init = async() => {
    try {
        const kafka = new Kafka({
            "clientId": "myKafkaApp",
            "brokers": ["192.168.1.3:9092"]
        })

        const admin = kafka.admin()
        console.log('Connecting')
        await admin.connect()
        console.log('Connected')

        await admin.createTopics({
            topics: [
                {
                    topic: ['Users'],
                    numPartitions: 2
                }
            ]
        })

        await admin.disconnect()
    } catch (error) {
        
    } finally {
        process.exit(0)
    }
}

init()